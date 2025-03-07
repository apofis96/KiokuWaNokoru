using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.DTO.UserBotIntegration;
using KiokuWaNokoru.Common.Enums;
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

        public async Task CompleteIntegration(Guid integrationId, string chatToken, BotProvider provider)
        {
            var isChatTokenInUse = await context.UserBotIntegrations
                .AnyAsync(ubi => ubi.ChatToken == chatToken);
            if (isChatTokenInUse)
                throw new InvalidOperationException("Chat token is already in use");

            var integration = await context.UserBotIntegrations.FirstOrDefaultAsync(ubi => ubi.Id == integrationId) ?? throw new KeyNotFoundException("Integration not found");

            integration.ChatToken = chatToken;
            integration.BotProvider = provider;

            await context.SaveChangesAsync();
        }
    }
}
