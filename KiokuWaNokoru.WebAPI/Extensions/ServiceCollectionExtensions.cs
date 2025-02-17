using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.BLL.Services;

namespace KiokuWaNokoru.WebAPI.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddCustomServices(this IServiceCollection services)
        {
            services.AddTransient<IReminderService, ReminderService>();
        }
    }
}
