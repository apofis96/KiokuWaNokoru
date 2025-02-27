using KiokuWaNokoru.Common.Exceptions;
using Microsoft.Extensions.Configuration;

namespace KiokuWaNokoru.Common.Configurations
{
    public class JwtConfiguration
    {
        public string Issuer { get; } = string.Empty;

        public string Secret { get; } = string.Empty;

        public string Audience { get; } = string.Empty;

        public int Expiration { get; }

        public JwtConfiguration(IConfiguration configuration)
        {
            var section = configuration.GetSection("JWT");
            Issuer = section["Issuer"] ?? throw new ConfigurationMissingException("jwt issuer");
            Secret = section["Secret"] ?? throw new ConfigurationMissingException("jwt secret");
            Audience = section["Audience"] ?? throw new ConfigurationMissingException("jwt audience");
            Expiration = Convert.ToInt32(section["Expiration"] ?? throw new ConfigurationMissingException("jwt expiration"));
        }

    }
}
