using KiokuWaNokoru.DAL.Entities.Common;

namespace KiokuWaNokoru.DAL.Entities
{
    public class User : BaseEntity
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Salt { get; set; } = string.Empty;

        public ICollection<UserBotIntegration> UserBotIntegrations { get; set; } = new List<UserBotIntegration>();
        public ICollection<Reminder> Reminders { get; set; } = new List<Reminder>();
    }
}
