using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.DTO.User;
using KiokuWaNokoru.WebAPI.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KiokuWaNokoru.WebAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserBotIntegrationController(IUserBotIntegrationService userBotIntegrationService) : ControllerBase
{
    [HttpGet("initialize")]
    public async Task<ActionResult<UserLoginResponseDto>> InitializeIntegration()
    {
        var userId = User.GetUserId();
        return Ok(await userBotIntegrationService.InitializeIntegrationAsync(userId));
    }
}
