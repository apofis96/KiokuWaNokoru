namespace KiokuWaNokoru.Bot.Interfaces
{
    public interface ITelegramCoreService
    {
        string GetBotToken();
        Task SendMessage(long chatId, string message);
    }
}
