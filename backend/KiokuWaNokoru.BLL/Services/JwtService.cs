using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.Configurations;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace KiokuWaNokoru.BLL.Services
{
    public class JwtService(JwtConfiguration jwtConfiguration) : IJwtService
    {
        private readonly JwtConfiguration _jwtConfiguration = jwtConfiguration;

        public string GenerateToken(Guid id)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, id.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfiguration.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtConfiguration.Issuer,
                audience: _jwtConfiguration.Audience,
                claims: claims,
                expires: DateTime.Now.AddDays(_jwtConfiguration.Expiration),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
