using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using ServerAPI.Models;
using ServerAPI.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace ServerAPI.Controllers
{
    [Route("account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDto dto)
        {
            var jwtToken = await _accountService.LoginAsync(dto);

            return Ok(new { Token = jwtToken });
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterDto dto)
        {
            await _accountService.RegisterAsync(dto);

            return Created("", null);
        }

        [Authorize]
        [HttpGet("details")]
        public async Task<ActionResult> GetDetails()
        {
            Request.Headers.TryGetValue(HeaderNames.Authorization, out var token);
            token = token.ToString().Remove(0, 7);
            var decoder = new JwtSecurityTokenHandler();
            var jwtDecoded = decoder.ReadJwtToken(token);
            var id = int.Parse(jwtDecoded.Claims.ToList()[0].Value);

            var details = await _accountService.GetDetailsAsync(id);

            return Ok(details);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("users")]
        public async Task<ActionResult> GetUsers()
        {
            var users = await _accountService.GetUsersAsync();

            return Ok(users);
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("users")]
        public async Task<ActionResult> ChangeRole([FromBody]NewRoleModel newRole)
        {
            await _accountService.ChangeRoleAsync(newRole.UserId, newRole.UserNewRole);

            return NoContent();
        }
    }
}
