using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.DTO.Reminder;
using Microsoft.AspNetCore.Mvc;

namespace KiokuWaNokoru.WebAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class RemindController : ControllerBase
{
    private readonly ILogger<RemindController> _logger;
    private readonly IReminderService _reminderService;

    public RemindController(ILogger<RemindController> logger, IReminderService reminderService)
    {
        _logger = logger;
        _reminderService = reminderService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ReminderDto>>> Get()
    {
        return Ok(await _reminderService.GetAllAsync());
    }

    [HttpPost]
    public async Task<ActionResult> Post()
    {
        await _reminderService.CreateTest();
        return Ok();
    }
}
