using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Railway_Backend.Service;

namespace Railway_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LiveStatusController : ControllerBase
    {
        private readonly LiveStatus _liveStatus;

        public LiveStatusController(LiveStatus liveStatus)
        {
            _liveStatus = liveStatus;
        }

        [HttpGet]
        [Route("liveStatus/{trainNumber}/{day}")]
        public async Task<IActionResult> GetLiveStatus(string trainNumber, string day)
        {
            var result = await _liveStatus.GetLiveTrainStatusAsync(trainNumber, day);
            return Ok(result);
        }
    }
}

