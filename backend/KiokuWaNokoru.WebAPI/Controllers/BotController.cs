using KiokuWaNokoru.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace KiokuWaNokoru.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BotController(IBotService botService) : ControllerBase
{
    private readonly IBotService _botService = botService;

    [HttpGet("{id}")]
    public async Task<ActionResult> Test(long id)
    {
        await _botService.TestAsync(id);
        return Ok();
    }
}
