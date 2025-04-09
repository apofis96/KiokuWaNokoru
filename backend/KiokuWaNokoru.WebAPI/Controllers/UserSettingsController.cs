using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.DTO.UserSettings;
using KiokuWaNokoru.WebAPI.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KiokuWaNokoru.WebAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserSettingsController(IUserSettingsService userSettingsService) : ControllerBase
{

    [HttpGet()]
    public async Task<ActionResult<UserSettingsDto>> Get()
    {
        var userId = User.GetUserId();
        return Ok(await userSettingsService.GetUserSettingsAsync(userId));
    }

    [HttpPut()]
    public async Task<ActionResult<UserSettingsDto>> Set(UserSettingsDto dto)
    {
        var userId = User.GetUserId();
        return Ok(await userSettingsService.SetUserSettingsAsync(dto, userId));
    }
}
