using Railway_Backend.Collections;

namespace Railway_Backend.Repository
{
    public interface ITrainScheduleRepository
    {
        Task<List<TrainSchedule>> GetTrainSchedulesByNameOrNumber(string searchTerm);
        Task<List<TrainSchedule>> GetAllAsync();
        Task<List<TrainOnStation>> GetTrainSchedulesForStation(string stationCode);
        Task<TrainOnStation> PredictArrivalTimeForTrain(string trainNumber, string stationCode);
        Task<SeatsData> GetTrainSeatInfo(string trainNumber, string date);
        Task<AvailableSeats> GetSeatAvailabilityByTrainNumber(string trainNumber);
        Task UpdateSeatAvailability(string trainNumber, string date, string className, int numberOfSeats);
        Task<List<BookingTrainDetails>> GetTrainSchedulesByStations(string fromStation, string toStation);
    }
}
