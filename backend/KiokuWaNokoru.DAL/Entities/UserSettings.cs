using KiokuWaNokoru.DAL.Entities.Common;

namespace KiokuWaNokoru.DAL.Entities
{
    public class UserSettings : BaseEntity
    {
        public Guid UserId { get; set; }
        public TimeOnly NotificationTime { get; set; } = TimeOnly.MinValue;

        public User User { get; set; } = null!;
    }
}
