using Railway_Backend.Collections;

namespace Railway_Backend.Repository
{
    public interface ITicketBookingRepository
    {
        Task<List<TicketBooking>> GetAllAsync();
        //Task CreateAsync(TicketBooking newTicketBooking);
        Task<List<TicketBooking>> GetByIdAsync(string userName);
        Task PostBooking(TicketBooking booking);

        Task UpdateBookingStatusToCancelled(string bookingId);
        Task UpdateSeatAvailability(string trainNumber, string className, string date, int passengerCount);

    }
}
