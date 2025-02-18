using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.BLL.Services;
using KiokuWaNokoru.DAL.Context;
using Microsoft.EntityFrameworkCore;

namespace KiokuWaNokoru.WebAPI.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddCustomServices(this IServiceCollection services)
        {
            services.AddTransient<IReminderService, ReminderService>();
        }

        public static void AddCustomDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionsString = configuration.GetConnectionString("KiokuWaNokoruDBConnection");

            services.AddDbContext<KiokuWaNokoruContext>(options =>
                options.UseNpgsql(connectionsString));
        }
    }
}
