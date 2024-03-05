using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using MongoDB.Driver;
using Railway_Backend.Collections;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Railway_Backend.Repository;

namespace Railway_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IRegisteredUser _registeredUser;

        public UserController(IRegisteredUser registeredUser)
        {
            _registeredUser = registeredUser;
        }
        [HttpPost]
        public IActionResult Register([FromBody]User user)
        {
            try
            {
                string result = _registeredUser.SaveUser(user);
                if (result == "User registered successfully")
                {
                    return Json(new { message = result });
                }
                else if (result == "Username already exists")
                {
                    return BadRequest(new { message = result });
                }
                else
                {
                    // Handle any other potential results or errors
                    return BadRequest("An unexpected error occurred during registration.");
                }
                
            }
            catch (Exception ex)
            {
                return BadRequest("Error registering user: " + ex.Message);
            }
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] login request)
        {
            try
            {
                User user = _registeredUser.LoginUser(request.UserName, request.Password);
                if (user == null)
                {
                    return BadRequest("Incorrect username or password");
                }

                // Generate JWT token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwOTM2MzExNCwiaWF0IjoxNzA5MzYzMTE0fQ.KU0RlsSJA_u_ojOK46Y4HuCFbveJD3CFhBsYujlukrE"); // Replace with your secret key
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                new Claim(ClaimTypes.Name, user.UserName)
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return Json(new
                {
                    message = "Login successful",
                    token = tokenString,
                    userDetails = user
                });
            }
            catch (Exception ex)
            {
                return BadRequest("Error logging in: " + ex.Message);
            }
        }

        private bool ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwOTM2MzExNCwiaWF0IjoxNzA5MzYzMTE0fQ.KU0RlsSJA_u_ojOK46Y4HuCFbveJD3CFhBsYujlukrE"); // Replace with your secret key
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero // Remove delay between the server and client clocks
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                // You can also validate the token's claims here if needed

                return true;
            }
            catch
            {
                return false;
            }
        }

        [HttpPut("{id}")]
        public IActionResult EditUser(string id, [FromBody] User user)
        {
            try
            {
                _registeredUser.EditUser(id, user);
                return Json(new { message = "User updated successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest("Error updating user: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(string id)
        {
            try
            {
                _registeredUser.DeleteUser(id);
                return Json(new { message = "User deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest("Error deleting user: " + ex.Message);
            }
        }


    }


}

