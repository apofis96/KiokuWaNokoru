using KiokuWaNokoru.Common.DTO.Common;

namespace KiokuWaNokoru.Common.DTO.Reminder
{
    public class ReminderDto : EntityDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
    }
}
