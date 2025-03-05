using KiokuWaNokoru.Common.Enums;
using KiokuWaNokoru.DAL.Entities.Common;

namespace KiokuWaNokoru.DAL.Entities
{
    public class UserBotIntegration : BaseEntity
    {
        public Guid UserId { get; set; }
        public string ChatToken { get; set; } = string.Empty;
        public BotProvider? BotProvider { get; set; } = null;

        public User User { get; set; } = null!;
    }
}
