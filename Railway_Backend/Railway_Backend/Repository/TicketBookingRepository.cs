using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Railway_Backend.Collections;
using System.Net.Sockets;

namespace Railway_Backend.Repository
{
    public class TicketBookingRepository:ITicketBookingRepository
    {
        private readonly IMongoCollection<TicketBooking> _mongoBookingCollection;
        private readonly IMongoCollection<SeatsData> _mongoSeatsCollection;
        private readonly IMongoCollection<AvailableSeats> _mongoAvailableCollection;
        public TicketBookingRepository(IMongoDatabase mongoDatabase) 
        {
            _mongoBookingCollection = mongoDatabase.GetCollection<TicketBooking>("PassengerBooking");
            _mongoSeatsCollection = mongoDatabase.GetCollection<SeatsData>("SeatAvailability");
            _mongoAvailableCollection = mongoDatabase.GetCollection<AvailableSeats>("SeatAvailability");


        }

        public async Task<List<TicketBooking>> GetAllAsync()
        {
            return await _mongoBookingCollection.Find(_ => true).ToListAsync();
        }


        public async Task<List<TicketBooking>> GetByIdAsync(string userName)
        {
            return await _mongoBookingCollection.Find(booking => booking.UserName == userName).ToListAsync();
        }

        public async Task PostBooking(TicketBooking booking)
        {
            booking.BookingDate = DateTime.UtcNow;

            
            booking.Status = "Booked";

            int seatNo = new Random().Next(1, 90); ;
            foreach (var passenger in booking.Passengers)
            {
                passenger.SeatNo = seatNo++;
            }

            await _mongoBookingCollection.InsertOneAsync(booking);
            await UpdateAvailableSeats(booking.TrainNumber, booking.ClassName, booking.Date, booking.Passengers.Count);
        }

        private async Task UpdateAvailableSeats(string trainNumber, string className, string bookingDate, int passengerCount)
        {
            
            var availableSeats = await _mongoAvailableCollection.Find(a => a.TrainNumber == trainNumber).FirstOrDefaultAsync();

            if (availableSeats == null)
            {   
                throw new Exception($"No available seats found for train {trainNumber}.");
            }

            var classIndex = availableSeats.Classes.FindIndex(c => c.ClassName == className);

            if (classIndex == -1)
            {
                throw new Exception($"Class {className} not found for train {trainNumber}.");
            }

            var filter = Builders<AvailableSeats>.Filter.And(
                Builders<AvailableSeats>.Filter.Eq(a => a.TrainNumber, trainNumber),
                Builders<AvailableSeats>.Filter.ElemMatch(a => a.Classes, c => c.ClassName == className)
            );

            var update = Builders<AvailableSeats>.Update.Inc($"classes.{classIndex}.bookedSeats.{bookingDate}", passengerCount);

            var updateResult = await _mongoAvailableCollection.UpdateOneAsync(filter, update);

            if (updateResult.ModifiedCount == 0)
            {
                var addUpdate = Builders<AvailableSeats>.Update.Set($"classes.{classIndex}.bookedSeat.{bookingDate}", passengerCount);
                await _mongoAvailableCollection.UpdateOneAsync(filter, addUpdate);
            }
        }

        public async Task UpdateBookingStatusToCancelled(string bookingId)
        {
            var booking = await _mongoBookingCollection.Find(b => b.Id == bookingId).FirstOrDefaultAsync();
            if (booking == null)
            {
                throw new Exception($"Booking with ID {bookingId} not found.");
            }

            var availableSeats = await _mongoAvailableCollection.Find(a => a.TrainNumber == booking.TrainNumber).FirstOrDefaultAsync();
            if (availableSeats == null)
            {
                throw new Exception($"No available seats found for train {booking.TrainNumber}.");
            }

            var classIndex = availableSeats.Classes.FindIndex(c => c.ClassName == booking.ClassName);
            if (classIndex == -1)
            {
                throw new Exception($"Class {booking.ClassName} not found for train {booking.TrainNumber}.");
            }

            var filter = Builders<AvailableSeats>.Filter.And(
                Builders<AvailableSeats>.Filter.Eq(a => a.TrainNumber, booking.TrainNumber),
                Builders<AvailableSeats>.Filter.ElemMatch(a => a.Classes, c => c.ClassName == booking.ClassName)
            );

            var update = Builders<AvailableSeats>.Update.Inc($"classes.{classIndex}.bookedSeats.{booking.Date}", -booking.Passengers.Count);

            var updateResult = await _mongoAvailableCollection.UpdateOneAsync(filter, update);

            if (updateResult.ModifiedCount == 0)
            {
                return;
            }

            var currentCount = availableSeats.Classes[classIndex].BookedSeats[booking.Date];
            if (currentCount == 0)
            {
                var removeUpdate = Builders<AvailableSeats>.Update.Unset($"classes.{classIndex}.bookedSeats.{booking.Date}");
                await _mongoAvailableCollection.UpdateOneAsync(filter, removeUpdate);
            }

            var bookingUpdate = Builders<TicketBooking>.Update.Set(b => b.Status, "Cancelled");
            await _mongoBookingCollection.UpdateOneAsync(filter: b => b.Id == bookingId, update: bookingUpdate);
        }
    }
}
   
