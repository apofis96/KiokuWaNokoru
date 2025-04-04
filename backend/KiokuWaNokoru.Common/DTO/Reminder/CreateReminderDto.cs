using KiokuWaNokoru.Common.Enums;

namespace KiokuWaNokoru.Common.DTO.Reminder
{
    public class CreateReminderDto
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
