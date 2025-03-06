using KiokuWaNokoru.Common.DTO.UserBotIntegration;

namespace KiokuWaNokoru.BLL.Interfaces
{
    public interface IUserBotIntegrationService
    {
        Task<CreateUserBotIntegrationResponseDto> InitializeIntegrationAsync(Guid userId);
    }
}
