using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Railway_Backend.Collections;
using Railway_Backend.Repository;

namespace Railway_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerServiceController : Controller
    {

        private readonly ICustomerServiceRepository _repository;

        public CustomerServiceController(ICustomerServiceRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitQuery([FromBody] Customer queryData)
        {
            try
            {
                // Store the query in MongoDB
                await _repository.AddQueryAsync(queryData);

                return Json(new { message = "Query Submitted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest("Error submitting query: " + ex.Message);
            }
        }
    }
}

