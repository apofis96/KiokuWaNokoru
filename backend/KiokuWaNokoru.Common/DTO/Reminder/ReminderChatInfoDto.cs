using KiokuWaNokoru.Common.DTO.Common;
using KiokuWaNokoru.Common.DTO.UserBotIntegration;

namespace KiokuWaNokoru.Common.DTO.Reminder
{
    public class ReminderChatInfoDto : EntityDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public IEnumerable<UserBotIntegrationChatInfoDto> ChatInfos { get; set; } = null!;
    }
}
