using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.DTO.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace KiokuWaNokoru.WebAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserBotIntegrationController(IUserBotIntegrationService userBotIntegrationService) : ControllerBase
{
    [HttpGet("initialize")]
    public async Task<ActionResult<UserLoginResponseDto>> InitializeIntegration()
    {

        var userId = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;
        if (userId == null)
        {
            return Unauthorized();
        }
        return Ok(await userBotIntegrationService.InitializeIntegrationAsync(Guid.Parse(userId)));
    }
}
