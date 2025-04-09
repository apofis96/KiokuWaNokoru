using KiokuWaNokoru.Common.DTO.User;
using KiokuWaNokoru.Common.DTO.UserSettings;

namespace KiokuWaNokoru.BLL.Interfaces
{
    public interface IUserSettingsService
    {
        Task<UserSettingsDto> GetUserSettingsAsync(Guid userId);
        Task<UserSettingsDto> SetUserSettingsAsync(UserSettingsDto userSettingsDto, Guid userId);
    }
}
