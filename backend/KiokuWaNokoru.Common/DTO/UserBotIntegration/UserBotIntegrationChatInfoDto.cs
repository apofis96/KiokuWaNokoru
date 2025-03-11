using KiokuWaNokoru.Common.Enums;

namespace KiokuWaNokoru.Common.DTO.UserBotIntegration
{
    public class UserBotIntegrationChatInfoDto
    {
        public BotProvider? BotProvider { get; set; }
        public string ChatToken { get; set; } = string.Empty;
    }
}
