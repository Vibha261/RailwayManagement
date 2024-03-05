using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Railway_Backend.Collections;
using Railway_Backend.Repository;

namespace Railway_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainScheduleController : ControllerBase
    {
        private readonly ITrainScheduleRepository _trainScheduleRepository;

        public TrainScheduleController(ITrainScheduleRepository trainScheduleRepository)
        {
            _trainScheduleRepository = trainScheduleRepository;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var bookingDetails = await _trainScheduleRepository.GetAllAsync();
            return Ok(bookingDetails);
        }

        [HttpGet]
        [Route("{searchTerm}")]
        public async Task<IActionResult> GetTrainSchedules(string searchTerm)
        {
            Console.WriteLine("Controller" + searchTerm);
            var schedules = await _trainScheduleRepository.GetTrainSchedulesByNameOrNumber(searchTerm);
            return Ok(schedules);
        }

        [HttpGet]
        [Route("station/{stationCode}")]
        public async Task<IActionResult> GetTrainSchedulesForStation(string stationCode)
        {
            var trainOnStationList = await _trainScheduleRepository.GetTrainSchedulesForStation(stationCode);
            return Ok(trainOnStationList);
        }

        [HttpGet]
        [Route("arrivalTimePredictor/{trainNumber}/{stationCode}")]
        public async Task<IActionResult> ArrivalTimePredictor(string trainNumber, string stationCode)
        {
            var trainOnStationList = await _trainScheduleRepository.PredictArrivalTimeForTrain(trainNumber, stationCode);
            return Ok(trainOnStationList);
        }

        [HttpGet]
        [Route("trainSeatInfo/{trainNumber}/{date}")]
        public async Task<IActionResult> GetTrainSeatInfo(string trainNumber, string date)
        {
            var trainSeatInfo = await _trainScheduleRepository.GetTrainSeatInfo(trainNumber, date);
            if (trainSeatInfo == null)
            {
                return NotFound("Train number not found or no data available.");
            }
            return Ok(trainSeatInfo);
        }
        [HttpGet]
        [Route("{fromStation}/{toStation}")]
        public async Task<ActionResult<List<BookingTrainDetails>>> GetTrainSchedulesByStations(string fromStation, string toStation)
        {
            try
            {
                var trainSchedules = await _trainScheduleRepository.GetTrainSchedulesByStations(fromStation, toStation);
                return Ok(trainSchedules);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
