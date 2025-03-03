using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.DTO.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KiokuWaNokoru.WebAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController(IUserService userService) : ControllerBase
{
    private readonly IUserService _userService = userService;

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(CreateUserDto dto)
    {
        return Ok(await _userService.CreateUserAsync(dto));
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserLoginResponseDto>> Login(UserLoginRequestDto dto)
    {
        return Ok(await _userService.LoginUserAsync(dto));
    }
}
