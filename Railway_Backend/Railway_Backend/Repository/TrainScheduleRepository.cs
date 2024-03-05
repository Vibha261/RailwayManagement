using MongoDB.Bson;
using MongoDB.Driver;
using Railway_Backend.Collections;

namespace Railway_Backend.Repository
{
    public class TrainScheduleRepository : ITrainScheduleRepository
    {
        public readonly IMongoCollection<TrainSchedule> _mongoTrainScheduleCollection;
        public readonly IMongoCollection<AvailableSeats> _mongoSeatAvailabilityCollection;

        public TrainScheduleRepository(IMongoDatabase mongoDatabase)
        {
            _mongoTrainScheduleCollection = mongoDatabase.GetCollection<TrainSchedule>("TrainSchedule");
            _mongoSeatAvailabilityCollection = mongoDatabase.GetCollection<AvailableSeats>("SeatAvailability");
        }

        public async Task<List<TrainSchedule>> GetAllAsync()
        {
            return await _mongoTrainScheduleCollection.Find(_ => true).ToListAsync();
        }
        public async Task<List<TrainSchedule>> GetTrainSchedulesByNameOrNumber(string searchTerm)
        {
            var filter = Builders<TrainSchedule>.Filter.Or(
                Builders<TrainSchedule>.Filter.Eq(ts => ts.TrainName, searchTerm),
                Builders<TrainSchedule>.Filter.Eq(ts => ts.TrainNumber, searchTerm)
            );
            Console.WriteLine(filter);

            var schedules= await _mongoTrainScheduleCollection.Find(filter).ToListAsync();
            Console.WriteLine(schedules.Count.ToString());
            return schedules;
        }
        public async Task<List<TrainOnStation>> GetTrainSchedulesForStation(string stationCode)
        {
            var trainSchedules = await _mongoTrainScheduleCollection.Find(_ => true).ToListAsync();
            var trainOnStationList = new List<TrainOnStation>();

            foreach (var trainSchedule in trainSchedules)
            {
                foreach (var station in trainSchedule.StationListString ?? Enumerable.Empty<Station>())
                {
                    if (station.StationCode == stationCode)
                    {
                        var trainOnStation = new TrainOnStation
                        {
                            ArrivalTime = station.ArrivalTime,
                            DepartureTime = station.DepartureTime,
                            TrainName = trainSchedule.TrainName,
                            TrainNumber = trainSchedule.TrainNumber,
                            SourceStation = trainSchedule.StationFrom,
                            DestinationStation = trainSchedule.StationTo,
                            StationName = station.StationName,
                            HaltTime = station.HaltTime
                        };

                        trainOnStationList.Add(trainOnStation);
                    }
                }
            }

            return trainOnStationList;
        }

        public async Task<TrainOnStation> PredictArrivalTimeForTrain(string trainNumber, string stationCode)
        {
            var trainSchedule = await _mongoTrainScheduleCollection.Find(ts => ts.TrainNumber == trainNumber).FirstOrDefaultAsync();
            if (trainSchedule == null)
            {
                return null; // Or handle this case as needed
            }

            var station = trainSchedule.StationListString?.FirstOrDefault(s => s.StationCode == stationCode);
            if (station == null)
            {
                return null; // Or handle this case as needed
            }

            var trainOnStation = new TrainOnStation
            {
                ArrivalTime = PredictArrivalTime(station.ArrivalTime),
                DepartureTime = station.DepartureTime,
                TrainName = trainSchedule.TrainName,
                TrainNumber = trainSchedule.TrainNumber,
                SourceStation = trainSchedule.StationFrom,
                DestinationStation = trainSchedule.StationTo,
                StationName = station.StationName,
                HaltTime = station.HaltTime
            };

            return trainOnStation;
        }

        private string PredictArrivalTime(string arrivalTime)
        {
            var arrivalDateTime = DateTime.Parse(arrivalTime);
            var delay = new Random().Next(0, 50); 
            arrivalDateTime = arrivalDateTime.AddMinutes(delay);
            return arrivalDateTime.ToString("HH:mm");
        }

        public async Task<SeatsData> GetTrainSeatInfo(string trainNumber, string date)
        {
            var trainSchedule = await _mongoTrainScheduleCollection.Find(ts => ts.TrainNumber == trainNumber).FirstOrDefaultAsync();
            if (trainSchedule == null)
            {
                return null;
            }

            // Fetch seat availability data
            var seatAvailability = await GetSeatAvailabilityByTrainNumber(trainNumber);
            if (seatAvailability == null)
            {
                return null;
            }
            // Filter seat availability based on the date
            foreach (var seatClass in seatAvailability.Classes)
            {
                if (seatClass.BookedSeat.ContainsKey(date))
                {
                    seatClass.AvailableSeats -= seatClass.BookedSeat[date];
                }
            }

            // Combine the data
            var trainSeatModel = new SeatsData
            {
                TrainNumber = trainSchedule.TrainNumber,
                TrainName = trainSchedule.TrainName,
                StationFrom = trainSchedule.StationFrom,
                StationTo = trainSchedule.StationTo,
                Classes = seatAvailability.Classes
            };

            return trainSeatModel;
        }

        public async Task<AvailableSeats> GetSeatAvailabilityByTrainNumber(string trainNumber)
        {
            return await _mongoSeatAvailabilityCollection.Find(sa => sa.TrainNumber == trainNumber).FirstOrDefaultAsync();
        }

        public async Task UpdateSeatAvailability(string trainNumber, string date, string className, int numberOfSeats)
        {
            // Define the filter to match the document with the specified trainNumber and className within the Classes array
            var filter = Builders<AvailableSeats>.Filter.And(
                Builders<AvailableSeats>.Filter.Eq(sa => sa.TrainNumber, trainNumber),
                Builders<AvailableSeats>.Filter.ElemMatch(sa => sa.Classes, c => c.ClassName == className)
            );

            // Define the update to set the numberOfSeats for the specified date in the BookedSeat dictionary
            var update = Builders<AvailableSeats>.Update.Set(
                sa => sa.Classes[-1].BookedSeat[date], numberOfSeats
            );

            // Use the ArrayFilters option to specify which element in the Classes array to update
            var options = new UpdateOptions
            {
                ArrayFilters = new List<ArrayFilterDefinition>
        {
            new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("c.className", className))
        }
            };

            // Execute the update operation
            var result = await _mongoSeatAvailabilityCollection.UpdateOneAsync(filter, update, options);

            if (result.ModifiedCount == 0)
            {
                // Handle the case where no document was updated, e.g., log an error or throw an exception
                Console.WriteLine("No document was updated. Check the trainNumber, className, and date.");
            }
        }
        public async Task<List<BookingTrainDetails>> GetTrainSchedulesByStations(string fromStation, string toStation)
        {
            var trainSchedules = await _mongoTrainScheduleCollection.Find(_ => true).ToListAsync();
            var filteredTrainSchedules = new List<BookingTrainDetails>();

            foreach (var trainSchedule in trainSchedules)
            {
                var fromStationFound = false;
                var toStationFound = false;
                var fromStationArrivalTime = "";
                var fromStationDepartureTime = "";
                var toStationArrivalTime = "";
                var toStationDepartureTime = "";
                var check = 0;

                foreach (var station in trainSchedule.StationListString ?? Enumerable.Empty<Station>())
                {
                    if (station.StationCode == fromStation)
                    {
                        fromStationFound = true;
                        fromStationArrivalTime = station.ArrivalTime;
                        fromStationDepartureTime = station.DepartureTime;
                        check = 1;
                    }
                    if (check == 1)
                    {
                        if (station.StationCode == toStation)
                        {
                            toStationFound = true;
                            toStationArrivalTime = station.ArrivalTime;
                            toStationDepartureTime = station.DepartureTime;
                        }

                    }
                    

                    if (fromStationFound && toStationFound)
                    {
                        break; // Both stations found, no need to continue checking
                    }
                }

                if (fromStationFound && toStationFound)
                {
                    var trainScheduleDetails = new BookingTrainDetails()
                    {
                        TrainName = trainSchedule.TrainName,
                        TrainNumber = trainSchedule.TrainNumber,
                        FromStation = fromStation,
                        FromStationArrivalTime = fromStationArrivalTime,
                        FromStationDepartureTime = fromStationDepartureTime,
                        ToStation = toStation,
                        ToStationArrivalTime = toStationArrivalTime,
                        ToStationDepartureTime = toStationDepartureTime
                    };

                    filteredTrainSchedules.Add(trainScheduleDetails);
                }
            }

            return filteredTrainSchedules;
        }
    }


}

