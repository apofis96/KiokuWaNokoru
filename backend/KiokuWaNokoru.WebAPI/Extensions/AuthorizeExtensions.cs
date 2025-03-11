using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace KiokuWaNokoru.WebAPI.Extensions
{
    public static class AuthorizeExtensions
    {
        public static Guid GetUserId(this ClaimsPrincipal user)
        {
            var userId = user.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value ?? throw new UnauthorizedAccessException();
            return Guid.Parse(userId);
        }
    }
}
