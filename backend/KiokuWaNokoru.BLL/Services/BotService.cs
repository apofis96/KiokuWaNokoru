using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Bot.Interfaces;

namespace KiokuWaNokoru.BLL.Services
{
    public class BotService(ITelegramCoreService telegramCoreService) : IBotService
    {
        private readonly ITelegramCoreService _telegramCoreService = telegramCoreService;

        public async Task TestAsync(long chatId)
        {
            await _telegramCoreService.SendMessage(chatId);
        }
    }
}
