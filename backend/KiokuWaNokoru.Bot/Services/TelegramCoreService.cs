using KiokuWaNokoru.Bot.Interfaces;
using Telegram.Bot;
using Telegram.Bot.Types;
using Telegram.Bot.Polling;
using Telegram.Bot.Types.Enums;
using Telegram.Bot.Types.ReplyMarkups;

namespace KiokuWaNokoru.Bot.Services
{
    public class TelegramCoreService : ITelegramCoreService
    {
        private readonly string _botToken;
        private readonly TelegramBotClient _bot;

        public TelegramCoreService(string? botToken)
        {
            _botToken = botToken ?? throw new Exception("TelegramCoreService not started");
            _bot = new TelegramBotClient(_botToken);

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
                await _bot.SendMessage(msg.Chat, "Welcome! Pick one direction",
                    replyMarkup: new InlineKeyboardButton[] { "Left", "Right" });
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

        public async Task SendMessage(long chatId)
        {
            await _bot.SendMessage(chatId, "Hello World!");
        }
    }
}
