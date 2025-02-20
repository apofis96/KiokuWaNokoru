namespace KiokuWaNokoru.Common.DTO.Reminder
{
    public class CreateReminderDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
    }
}
