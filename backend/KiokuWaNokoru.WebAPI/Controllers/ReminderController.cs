using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.DTO.Common;
using KiokuWaNokoru.Common.DTO.Reminder;
using KiokuWaNokoru.WebAPI.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KiokuWaNokoru.WebAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ReminderController(ILogger<ReminderController> logger, IReminderService reminderService) : ControllerBase
{
    private readonly ILogger<ReminderController> _logger = logger;
    private readonly IReminderService _reminderService = reminderService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ReminderDto>>> GetAllAsync()
    {
        return Ok(await _reminderService.GetAllAsync());
    }

    [HttpPost]
    public async Task<ActionResult> CreateAsync([FromBody] CreateReminderDto dto)
    {
        var userId = User.GetUserId();
        return Ok(await _reminderService.CreateAsync(dto, userId));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ReminderDto>> GetByIdAsync(Guid id)
    {
        return Ok(await _reminderService.GetByIdAsync(id));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ReminderDto>> UpdateAsync(Guid id, [FromBody] UpdateReminderDto dto)
    {
        var userId = User.GetUserId();
        return Ok(await _reminderService.UpdateAsync(id, userId, dto));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAsync(Guid id)
    {
        var userId = User.GetUserId();
        await _reminderService.DeleteAsync(id, userId);
        return NoContent();
    }

    [HttpGet("all")]
    public async Task<ActionResult<TableDto<ReminderDto>>> GetByUserIdAsync()
    {
        var userId = User.GetUserId();
        return Ok(await _reminderService.GetByUserIdAsync(userId));
    }
}
