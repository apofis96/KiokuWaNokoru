using KiokuWaNokoru.Common.DTO.Common;

namespace KiokuWaNokoru.Common.DTO.User
{
    public class UserDto : EntityDto
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
    }
}
