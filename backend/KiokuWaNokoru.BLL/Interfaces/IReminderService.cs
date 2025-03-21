using KiokuWaNokoru.Common.DTO.Common;
using KiokuWaNokoru.Common.DTO.Reminder;

namespace KiokuWaNokoru.BLL.Interfaces
{
    public interface IReminderService
    {
        Task<IEnumerable<ReminderDto>> GetAllAsync();
        Task<ReminderDto> GetByIdAsync(Guid id);
        Task<ReminderDto> CreateAsync(CreateReminderDto reminderDto, Guid userId);
        Task<ReminderDto> UpdateAsync(Guid id, UpdateReminderDto reminderDto);
        Task DeleteAsync(Guid id);
        Task<IEnumerable<ReminderChatInfoDto>> GetEllapsedAsync(DateTimeOffset dateTime);
        Task MarkAsDelivered(Guid id);
        Task<TableDto<ReminderDto>> GetByUserIdAsync(Guid userId);
    }
}
