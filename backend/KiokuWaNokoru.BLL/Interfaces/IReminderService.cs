using KiokuWaNokoru.Common.DTO.Reminder;

namespace KiokuWaNokoru.BLL.Interfaces
{
    public interface IReminderService
    {
        Task<IEnumerable<ReminderDto>> GetAllAsync();
        Task<ReminderDto> GetByIdAsync(Guid id);
        Task<ReminderDto> CreateAsync(CreateReminderDto reminderDto);
        Task<ReminderDto> UpdateAsync(Guid id, UpdateReminderDto reminderDto);
        Task DeleteAsync(Guid id);
    }
}
