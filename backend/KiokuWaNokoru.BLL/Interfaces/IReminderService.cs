using KiokuWaNokoru.Common.DTO.Reminder;

namespace KiokuWaNokoru.BLL.Interfaces
{
    public interface IReminderService
    {
        Task<IEnumerable<ReminderDto>> GetAllAsync();
        Task CreateTest();
    }
}
