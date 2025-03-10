using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Bot.Interfaces;
using KiokuWaNokoru.Common.Enums;
using Quartz;

namespace KiokuWaNokoru.WebAPI.Jobs
{
    public class ReminderJob(ITelegramCoreService telegramCoreService, IUserBotIntegrationService userBotIntegrationService) : IJob
    {
        public async Task Execute(IJobExecutionContext context)
        {
            var tokens = await userBotIntegrationService.GetAllTokensByPrviderAsync(BotProvider.Telegram);
            foreach (var token in tokens)
            {
                try
                {
                    await telegramCoreService.SendMessage(long.Parse(token));
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }
            Console.WriteLine($"Job executed at {DateTime.Now}");
        }
    }
}
