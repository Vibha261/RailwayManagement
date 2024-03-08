using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Railway_Backend.Collections;
using Railway_Backend.Repository;
using System.Net.Sockets;

namespace Railway_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : Controller
    {
        private readonly ITicketBookingRepository _ticketBookingRepository;
        public BookingController(ITicketBookingRepository ticketBookingRepository) 
        {
            _ticketBookingRepository = ticketBookingRepository;
        }

        //Reteriving all the booking Details
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var bookingDetails = await _ticketBookingRepository.GetAllAsync();
            return Ok(bookingDetails);
        }

        //Reterieving only the current user booking details
        [HttpGet]
        [Route("/{userName}")]
        public async Task<IActionResult> Get(string userName)
        {
            var bookingDetails = await _ticketBookingRepository.GetByIdAsync(userName);
            return Ok(bookingDetails);

        }

        //update the booked ticket data in database
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]TicketBooking newTicketBooking)
        {
            try
            {
                await _ticketBookingRepository.PostBooking(newTicketBooking);


                return Json(new { message = "Query Submitted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest("Error submitting query: " + ex.Message);
            }
        }

        //updating the data for cancellation of bookings
        [HttpPut]
        [Route("/cancel/{bookingId}")]
        public async Task<IActionResult> CancelBooking(string bookingId)
        {
            try
            {
                await _ticketBookingRepository.UpdateBookingStatusToCancelled(bookingId);

                return Ok(new { message = "Booking cancelled successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest("Error canceling booking: " + ex.Message);
            }
        }

    }
}
