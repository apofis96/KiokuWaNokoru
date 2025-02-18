using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.DTO.Reminder;
using KiokuWaNokoru.DAL.Context;
using KiokuWaNokoru.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KiokuWaNokoru.BLL.Services
{
    public class ReminderService(KiokuWaNokoruContext context) : IReminderService
    {
        private readonly KiokuWaNokoruContext _context = context;

        public async Task<IEnumerable<ReminderDto>> GetAllAsync()
        {
            return await _context.Reminders.Select(r => new ReminderDto
            {
                Id = r.Id
            }).ToListAsync();
        }

        public async Task CreateTest()
        {
            Reminder reminder = new() { };

            _context.Reminders.Add(reminder);
            await _context.SaveChangesAsync();
        }
    }
}
