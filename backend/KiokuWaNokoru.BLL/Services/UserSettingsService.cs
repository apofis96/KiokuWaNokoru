using AutoMapper;
using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.DTO.UserSettings;
using KiokuWaNokoru.DAL.Context;
using Microsoft.EntityFrameworkCore;

namespace KiokuWaNokoru.BLL.Services
{
    public class UserSettingsService(KiokuWaNokoruContext context, IMapper mapper) : IUserSettingsService
    {
        public async Task<UserSettingsDto> GetUserSettingsAsync(Guid userId)
        {
            var userSetting = await context.UserSettings.AsNoTracking().FirstOrDefaultAsync(us => us.UserId == userId);

            return mapper.Map<UserSettingsDto>(userSetting);
        }

        public async Task<UserSettingsDto> SetUserSettingsAsync(UserSettingsDto userSettingsDto, Guid userId)
        {
            var userSetting = await context.UserSettings.FirstOrDefaultAsync(us => us.UserId == userId) ?? throw new KeyNotFoundException();

            userSetting.NotificationTime = userSettingsDto.NotificationTime;

            context.UserSettings.Update(userSetting);
            await context.SaveChangesAsync();

            return mapper.Map<UserSettingsDto>(userSetting);
        }
    }
}
