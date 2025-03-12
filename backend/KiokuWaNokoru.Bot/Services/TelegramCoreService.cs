using KiokuWaNokoru.Bot.Interfaces;
using Telegram.Bot;
using Telegram.Bot.Types;
using Telegram.Bot.Polling;
using Telegram.Bot.Types.Enums;
using Microsoft.Extensions.DependencyInjection;
using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.Enums;

namespace KiokuWaNokoru.Bot.Services
{
    public class TelegramCoreService : ITelegramCoreService
    {
        private readonly string _botToken;
        private readonly TelegramBotClient _bot;
        private readonly IServiceProvider _serviceProvider;

        public TelegramCoreService(string? botToken, IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _botToken = botToken ?? throw new Exception("TelegramCoreService not started");
            _bot = new TelegramBotClient(_botToken);
            _bot.SetWebhook("");

            _bot.OnError += OnError;
            _bot.OnMessage += OnMessage;
            _bot.OnUpdate += OnUpdate;
        }

        public string GetBotToken()
        {
            return _botToken;
        }

        async Task OnError(Exception exception, HandleErrorSource source)
        {
            Console.WriteLine(exception); // just dump the exception to the console
        }

        // method that handle messages received by the bot:
        async Task OnMessage(Message msg, UpdateType type)
        {
            if (msg.Text == "/start")
            {
                await _bot.SendMessage(msg.Chat, "Please provide an integration code");
                return;
            }

            var isGuid = Guid.TryParse(msg.Text, out var guid);
            if (!isGuid)
            {
                await _bot.SendMessage(msg.Chat, "Invalid code");
                return;
            }

            using var scope = _serviceProvider.CreateScope();
            var userBotIntegrationService = scope.ServiceProvider.GetRequiredService<IUserBotIntegrationService>();
            try
            {
                await userBotIntegrationService.CompleteIntegration(guid, msg.Chat.Id.ToString(), BotProvider.Telegram);

                await _bot.SendMessage(msg.Chat, "Integration successful");
            }
            catch (Exception e)
            {
                await _bot.SendMessage(msg.Chat, e.Message);
            }
        }

        // method that handle other types of updates received by the bot:
        async Task OnUpdate(Update update)
        {
            if (update is { CallbackQuery: { } query }) // non-null CallbackQuery
            {
                await _bot.AnswerCallbackQuery(query.Id, $"You picked {query.Data}");
                await _bot.SendMessage(query.Message!.Chat, $"User {query.From} clicked on {query.Data}");
            }
        }

        public async Task SendMessage(long chatId, string message)
        {
            await _bot.SendMessage(chatId, message);
        }
    }
}
