using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.DTO.Common;
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

        public async Task<IEnumerable<string>> GetAllTokensByPrviderAsync(BotProvider provider)
        {
            return await context.UserBotIntegrations.Where(ubi => ubi.BotProvider == provider).Select(ubi => ubi.ChatToken).ToListAsync();
        }

        public async Task<TableDto<UserBotIntegrationDto>> GetIntegrationsByUserAsync(Guid userId)
        {
            var items = await context.UserBotIntegrations
                .Where(ubi => ubi.UserId == userId)
                .Select(ubi => new UserBotIntegrationDto
                {
                    Id = ubi.Id,
                    BotProvider = ubi.BotProvider,
                    CreatedAt = ubi.CreatedAt,
                })
                .ToListAsync();
            var total = await context.UserBotIntegrations.CountAsync(ubi => ubi.UserId == userId);

            return new() { Items = items, Total = total };
        }

        public async Task DeleteAsync(Guid id, Guid userId)
        {
            var integration = await context.UserBotIntegrations.FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId) ?? throw new KeyNotFoundException();
            context.UserBotIntegrations.Remove(integration);
            await context.SaveChangesAsync();
        }
    }
}
