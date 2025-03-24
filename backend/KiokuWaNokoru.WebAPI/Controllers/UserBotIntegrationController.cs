using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.DTO.Common;
using KiokuWaNokoru.Common.DTO.UserBotIntegration;
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
    public async Task<ActionResult<CreateUserBotIntegrationResponseDto>> InitializeIntegration()
    {
        var userId = User.GetUserId();
        return Ok(await userBotIntegrationService.InitializeIntegrationAsync(userId));
    }

    [HttpGet("all")]
    public async Task<ActionResult<TableDto<UserBotIntegrationDto>>> GetAllTokensByUser()
    {
        var userId = User.GetUserId();
        return Ok(await userBotIntegrationService.GetIntegrationsByUserAsync(userId));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAsync(Guid id)
    {
        var userId = User.GetUserId();
        await userBotIntegrationService.DeleteAsync(id, userId);
        return NoContent();
    }
}
