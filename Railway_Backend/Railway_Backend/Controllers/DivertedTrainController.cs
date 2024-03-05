using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Railway_Backend.Repository;

namespace Railway_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DivertedTrainController : ControllerBase
    {
        private readonly IDivertedTrainRepository _divertedTrainRepository;

        public DivertedTrainController(IDivertedTrainRepository divertedTrainRepository)
        {
            _divertedTrainRepository = divertedTrainRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var DivertedDetails = await _divertedTrainRepository.GetAllAsync();
            return Ok(DivertedDetails);
        }
    }
}
