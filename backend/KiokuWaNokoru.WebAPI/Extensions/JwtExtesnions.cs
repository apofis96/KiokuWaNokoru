﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using KiokuWaNokoru.Common.Configurations;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi.Models;

namespace KiokuWaNokoru.WebAPI.Extensions
{
    public static class JwtExtesnions {
        public static AuthenticationBuilder AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtConfiguration = new JwtConfiguration(configuration);

            services.AddAuthorization();

            return services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtConfiguration.Issuer,
                    ValidAudience = jwtConfiguration.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfiguration.Secret)),

                    RequireExpirationTime = true,
                };
                x.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        string? authorization = context.Request.Headers["Authorization"];

                        if (string.IsNullOrEmpty(authorization))
                        {
                            context.NoResult();
                        }
                        else
                        {
                            context.Token = authorization.Replace("Bearer ", string.Empty);
                        }

                        return Task.CompletedTask;
                    },
                };
            });
        }
    }
}
