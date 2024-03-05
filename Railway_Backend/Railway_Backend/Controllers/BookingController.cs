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

        [HttpGet]

        public async Task<IActionResult> Get()
        {
            var bookingDetails = await _ticketBookingRepository.GetAllAsync();
            return Ok(bookingDetails);
        }

        [HttpGet]
        [Route("/{userName}")]
        public async Task<IActionResult> Get(string userName)
        {
            var bookingDetails = await _ticketBookingRepository.GetByIdAsync(userName);
            return Ok(bookingDetails);

        }

        [HttpPost]

        public async Task<IActionResult> Post([FromBody]TicketBooking newTicketBooking)
        {
            try
            {
                // Store the query in MongoDB
                await _ticketBookingRepository.PostBooking(newTicketBooking);
                //await _ticketBookingRepository.UpdateSeatAvailability(newTicketBooking.TrainNumber, newTicketBooking.ClassName, newTicketBooking.Date, newTicketBooking.Passengers.Count);


                return Json(new { message = "Query Submitted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest("Error submitting query: " + ex.Message);
            }
        }

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

        //[HttpPut]
        //public async Task<IActionResult> UpdateSeatAvailability([FromBody] TicketBooking newTicketBooking)
        //{
        //    try
        //    {
        //        // Update seat availability
        //        await _ticketBookingRepository.UpdateSeatAvailability(newTicketBooking.TrainNumber, newTicketBooking.ClassName, newTicketBooking.Date, newTicketBooking.Passengers.Count);

        //        return Ok(new { message = "Seat availability updated successfully" });
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest("Error updating seat availability: " + ex.Message);
        //    }
        //}



    }
}
