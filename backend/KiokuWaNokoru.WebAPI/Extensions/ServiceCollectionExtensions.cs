﻿using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.BLL.Services;
using KiokuWaNokoru.Bot.Interfaces;
using KiokuWaNokoru.Bot.Services;
using KiokuWaNokoru.Common.Configurations;
using KiokuWaNokoru.DAL.Context;
using Microsoft.EntityFrameworkCore;

namespace KiokuWaNokoru.WebAPI.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddCustomServices(this IServiceCollection services)
        {
            services.AddTransient<IReminderService, ReminderService>();
            services.AddTransient<IJwtService, JwtService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IUserBotIntegrationService, UserBotIntegrationService>();
            services.AddTransient<IUserSettingsService, UserSettingsService>();

            services.AddTransient<JwtConfiguration>();
        }

        public static void AddCustomDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionsString = configuration.GetConnectionString("KiokuWaNokoruDBConnection");

            services.AddDbContext<KiokuWaNokoruContext>(options =>
                options.UseNpgsql(connectionsString));
        }

        public static void AddTelegram(this IServiceCollection services, IConfiguration configuration)
        {
            var botToken = configuration["TelegramBotToken"];
            services.AddSingleton<ITelegramCoreService>(sp => new TelegramCoreService(botToken, sp));
        }
    }
}
