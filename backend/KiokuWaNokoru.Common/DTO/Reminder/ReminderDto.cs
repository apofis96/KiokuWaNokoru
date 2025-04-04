using KiokuWaNokoru.Common.DTO.Common;
using KiokuWaNokoru.Common.Enums;

namespace KiokuWaNokoru.Common.DTO.Reminder
{
    public class ReminderDto : EntityDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public bool IsRecurring { get; set; }
        public Recurrence RecurrenceType { get; set; }
        public required string RecurrenceValue { get; set; }
        public DateTimeOffset NextFireAt { get; set; }
        public bool IsOfNotificationTime { get; set; } = false;
    }
}
