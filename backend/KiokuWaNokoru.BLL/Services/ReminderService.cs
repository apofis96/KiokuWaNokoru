using AutoMapper;
using Cronos;
using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.DTO.Common;
using KiokuWaNokoru.Common.DTO.Reminder;
using KiokuWaNokoru.Common.DTO.UserBotIntegration;
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
            var reminder = await _context.Reminders.FirstOrDefaultAsync(r => r.Id == id) ?? throw new KeyNotFoundException();

            return _mapper.Map<ReminderDto>(reminder);
        }

        public async Task<ReminderDto> CreateAsync(CreateReminderDto reminderDto, Guid userId)
        {
            var newReminder = _mapper.Map<Reminder>(reminderDto);
            newReminder.UserId = userId;
            newReminder.NextFireAt = newReminder.NextFireAt.ToUniversalTime();

            _context.Reminders.Add(newReminder);
            await _context.SaveChangesAsync();

            return _mapper.Map<ReminderDto>(newReminder);
        }

        public async Task<ReminderDto> UpdateAsync(Guid id, UpdateReminderDto reminderDto)
        {
            var reminder = await _context.Reminders.FirstOrDefaultAsync(r => r.Id == id) ?? throw new KeyNotFoundException();
            reminder = _mapper.Map(reminderDto, reminder);
            await _context.SaveChangesAsync();

            return _mapper.Map<ReminderDto>(reminder);
        }

        public async Task DeleteAsync(Guid id, Guid userId)
        {
            var reminder = await _context.Reminders.FirstOrDefaultAsync(r => r.Id == id && r.UserId == userId) ?? throw new KeyNotFoundException();
            _context.Reminders.Remove(reminder);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ReminderChatInfoDto>> GetEllapsedAsync(DateTimeOffset dateTime)
        {
            var reminders = await _context.Reminders
                .Include(r => r.User)
                .ThenInclude(u => u.UserBotIntegrations)
                .Where(r => r.NextFireAt < dateTime)
                .Select(r => new ReminderChatInfoDto
                {
                    Id = r.Id,
                    Title = r.Title,
                    Description = r.Description,
                    ChatInfos = r.User.UserBotIntegrations.Select(ubi => new UserBotIntegrationChatInfoDto
                    {
                        ChatToken = ubi.ChatToken,
                        BotProvider = ubi.BotProvider,
                    }),
                })
                .AsNoTracking()
                .ToListAsync();
            
            return reminders;
        }

        public async Task MarkAsDelivered(Guid id)
        {
            var reminder = await _context.Reminders.FirstOrDefaultAsync(r => r.Id == id);
            if (reminder == null)
                return;

            if (!reminder.IsRecurring)
            {
                reminder.NextFireAt = DateTimeOffset.MaxValue.ToUniversalTime();
                await _context.SaveChangesAsync();
                return;
            }
            
            if (reminder.RecurrenceType == Common.Enums.Recurrence.Days)
            {
                reminder.NextFireAt = reminder.NextFireAt.AddDays(double.Parse(reminder.RecurrenceValue));
            }
            else
            {
                var cron = CronExpression.Parse(reminder.RecurrenceValue);
                reminder.NextFireAt = cron.GetNextOccurrence(reminder.NextFireAt.ToUniversalTime(), TimeZoneInfo.Utc) ?? throw new Exception();
            }
            await _context.SaveChangesAsync();
        }

        public async Task<TableDto<ReminderDto>> GetByUserIdAsync(Guid userId)
        {
            var reminders = await _context.Reminders
                .Where(r => r.UserId == userId)
                .ToListAsync();
            var total = await _context.Reminders
                .Where(r => r.UserId == userId)
                .CountAsync();

            return new TableDto<ReminderDto>
            {
                Items = _mapper.Map<IEnumerable<ReminderDto>>(reminders),
                Total = total,
            };
        }
    }
}
