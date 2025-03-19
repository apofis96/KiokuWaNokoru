using KiokuWaNokoru.Common.DTO.Common;
using KiokuWaNokoru.Common.Enums;

namespace KiokuWaNokoru.Common.DTO.UserBotIntegration
{
    public class UserBotIntegrationDto : EntityDto
    {
        public BotProvider? BotProvider { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
    }
}
