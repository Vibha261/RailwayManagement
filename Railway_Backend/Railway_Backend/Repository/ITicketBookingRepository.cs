using Railway_Backend.Collections;

namespace Railway_Backend.Repository
{
    public interface ITicketBookingRepository
    {
        Task<List<TicketBooking>> GetAllAsync();
        Task<List<TicketBooking>> GetByIdAsync(string userName);
        Task PostBooking(TicketBooking booking);
        //Task UpdateAvailableSeats(string trainNumber, string className, string bookingDate, int passengerCount);
        Task UpdateBookingStatusToCancelled(string bookingId);

    }
}
