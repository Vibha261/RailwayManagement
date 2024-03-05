using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Railway_Backend.Repository;

namespace Railway_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CancelledTrainController : ControllerBase
    {
        private readonly ICancelledTrainsRepository _cancelledTrainRepository;

        public CancelledTrainController(ICancelledTrainsRepository cancelledTrainRepository)
        {
            _cancelledTrainRepository = cancelledTrainRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var CancelledDetails = await _cancelledTrainRepository.GetAllAsync();
            return Ok(CancelledDetails);
        }
    }
}
