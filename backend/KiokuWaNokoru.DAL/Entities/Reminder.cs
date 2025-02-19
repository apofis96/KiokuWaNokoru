using KiokuWaNokoru.DAL.Entities.Common;

namespace KiokuWaNokoru.DAL.Entities
{
    public class Reminder : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
