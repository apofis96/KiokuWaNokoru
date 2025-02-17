using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.DTO.Reminder;

namespace KiokuWaNokoru.BLL.Services
{
    public class ReminderService : IReminderService
    {
        public Task<IEnumerable<ReminderDto>> GetAllAsync()
        {
            return Task.FromResult(Enumerable.Range(1, 5).Select(index => new ReminderDto
            {
                Id = Guid.NewGuid(),
            }));
        }
    }
}
