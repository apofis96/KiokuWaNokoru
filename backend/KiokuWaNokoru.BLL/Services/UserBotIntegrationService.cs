using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.DTO.UserBotIntegration;
using KiokuWaNokoru.DAL.Context;
using KiokuWaNokoru.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KiokuWaNokoru.BLL.Services
{
    public class UserBotIntegrationService(KiokuWaNokoruContext context) : IUserBotIntegrationService
    {
        public async Task<CreateUserBotIntegrationResponseDto> InitializeIntegrationAsync(Guid userId)
        {
            var pendingIntegration = await context.UserBotIntegrations
                .Where(ubi => ubi.UserId == userId && ubi.BotProvider == null)
                .Select(ubi => new { ubi.Id })
                .FirstOrDefaultAsync();
            if (pendingIntegration != null)
                return new() { Id = pendingIntegration.Id };

            var newIntegration = new UserBotIntegration
            {
                UserId = userId,
            };
            context.UserBotIntegrations.Add(newIntegration);
            await context.SaveChangesAsync();

            return new() { Id = newIntegration.Id };
        }
    }
}
