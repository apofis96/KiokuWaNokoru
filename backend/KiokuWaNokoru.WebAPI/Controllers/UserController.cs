using KiokuWaNokoru.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KiokuWaNokoru.WebAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController(IJwtService jwtService) : ControllerBase
{
    private readonly IJwtService _jwtService = jwtService;

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult> Test(Guid id)
    {
        return Ok(_jwtService.GenerateToken(id));
    }
}
