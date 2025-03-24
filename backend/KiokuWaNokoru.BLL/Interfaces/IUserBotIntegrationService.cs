using KiokuWaNokoru.Common.DTO.Common;
using KiokuWaNokoru.Common.DTO.UserBotIntegration;
using KiokuWaNokoru.Common.Enums;

namespace KiokuWaNokoru.BLL.Interfaces
{
    public interface IUserBotIntegrationService
    {
        Task<CreateUserBotIntegrationResponseDto> InitializeIntegrationAsync(Guid userId);
        Task CompleteIntegration(Guid integrationId, string chatToken, BotProvider provider);
        Task<IEnumerable<string>> GetAllTokensByPrviderAsync(BotProvider provider);
        Task<TableDto<UserBotIntegrationDto>> GetIntegrationsByUserAsync(Guid userId);
        Task DeleteAsync(Guid id, Guid userId);
    }
}
