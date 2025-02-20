using AutoMapper;
using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.DTO.Reminder;
using KiokuWaNokoru.DAL.Context;
using KiokuWaNokoru.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KiokuWaNokoru.BLL.Services
{
    public class ReminderService(KiokuWaNokoruContext context, IMapper mapper) : IReminderService
    {
        private readonly KiokuWaNokoruContext _context = context;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<ReminderDto>> GetAllAsync()
        {
            var reminders = await _context.Reminders.ToListAsync();

            var mappedReminders = _mapper.Map<IEnumerable<ReminderDto>>(reminders);

            return mappedReminders;
        }

        public async Task<ReminderDto> GetByIdAsync(Guid id)
        {
            var reminder = await _context.Reminders.FirstOrDefaultAsync(r => r.Id == id) ?? throw new Exception();

            return _mapper.Map<ReminderDto>(reminder);
        }

        public async Task<ReminderDto> CreateAsync(CreateReminderDto reminderDto)
        {
            var newReminder = _mapper.Map<Reminder>(reminderDto);

            _context.Reminders.Add(newReminder);
            await _context.SaveChangesAsync();

            return _mapper.Map<ReminderDto>(newReminder);
        }

        public async Task<ReminderDto> UpdateAsync(Guid id, UpdateReminderDto reminderDto)
        {
            var reminder = await _context.Reminders.FirstOrDefaultAsync(r => r.Id == id) ?? throw new Exception();
            reminder = _mapper.Map(reminderDto, reminder);
            await _context.SaveChangesAsync();

            return _mapper.Map<ReminderDto>(reminder);
        }

        public async Task DeleteAsync(Guid id)
        {
            var reminder = await _context.Reminders.FirstOrDefaultAsync(r => r.Id == id) ?? throw new Exception();
            _context.Reminders.Remove(reminder);
            await _context.SaveChangesAsync();
        }
    }
}
