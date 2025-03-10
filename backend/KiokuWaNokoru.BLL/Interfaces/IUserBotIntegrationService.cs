using KiokuWaNokoru.Common.DTO.UserBotIntegration;
using KiokuWaNokoru.Common.Enums;

namespace KiokuWaNokoru.BLL.Interfaces
{
    public interface IUserBotIntegrationService
    {
        Task<CreateUserBotIntegrationResponseDto> InitializeIntegrationAsync(Guid userId);
        Task CompleteIntegration(Guid integrationId, string chatToken, BotProvider provider);
        Task<IEnumerable<string>> GetAllTokensByPrviderAsync(BotProvider provider);
    }
}
