using KiokuWaNokoru.Common.Enums;
using KiokuWaNokoru.DAL.Entities.Common;

namespace KiokuWaNokoru.DAL.Entities
{
    public class Reminder : BaseEntity
    {
        public Guid UserId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsRecurring { get; set; }
        public Recurrence RecurrenceType { get; set; }
        public string RecurrenceValue { get; set; } = string.Empty;
        public DateTimeOffset NextFireAt { get; set; } = DateTimeOffset.MaxValue;

        public User User { get; set; } = null!;
    }
}
