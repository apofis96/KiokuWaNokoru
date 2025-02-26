using KiokuWaNokoru.Bot.Interfaces;
using Microsoft.Extensions.Hosting;

namespace KiokuWaNokoru.Bot.Services
{
    public class TelegramBackgroundService(ITelegramCoreService telegramCoreService) : BackgroundService
    {
        private readonly ITelegramCoreService _telegramCoreService = telegramCoreService;
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                Console.WriteLine("Worker running at: {0}", DateTimeOffset.Now);
                Console.WriteLine(_telegramCoreService.GetBotToken());

                await Task.Delay(10000, stoppingToken);
            }
        }

    }
}