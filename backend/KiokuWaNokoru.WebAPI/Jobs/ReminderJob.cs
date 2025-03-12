using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Bot.Interfaces;
using KiokuWaNokoru.Common.Enums;
using Quartz;

namespace KiokuWaNokoru.WebAPI.Jobs
{
    public class ReminderJob(ITelegramCoreService telegramCoreService, IReminderService reminderService) : IJob
    {
        public async Task Execute(IJobExecutionContext context)
        {
            var dateTime = DateTimeOffset.Now.ToUniversalTime();
            var reminders = await reminderService.GetEllapsedAsync(dateTime);
            
            foreach (var reminder in reminders)
            {
                try
                {
                    var telegramTokens = reminder.ChatInfos.Where(r => r.BotProvider == BotProvider.Telegram).Select(r => r.ChatToken);
                    foreach (var token in telegramTokens)
                    {
                        await telegramCoreService.SendMessage(long.Parse(token), reminder.Title + " @ " + reminder.Description);
                        await reminderService.MarkAsDelivered(reminder.Id);
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }
            Console.WriteLine($"Job executed at {dateTime}, processed {reminders.Count()}");
        }
    }
}
