using KiokuWaNokoru.Common.DTO.User;

namespace KiokuWaNokoru.BLL.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> CreateUserAsync(CreateUserDto userDto);
        Task<UserLoginResponseDto> LoginUserAsync(UserLoginRequestDto userLoginDto);
    }
}
