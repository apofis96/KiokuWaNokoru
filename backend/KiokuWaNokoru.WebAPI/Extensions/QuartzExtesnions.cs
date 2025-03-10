using Quartz;
using KiokuWaNokoru.WebAPI.Jobs;

namespace KiokuWaNokoru.WebAPI.Extensions
{
    public static class QuartzExtesnions {
        public static void AddQuartzHosted(this IServiceCollection services)
        {
            services.AddQuartz(q =>
            {
                q.AddJob<ReminderJob>(j => j.WithIdentity("ReminderJob"));
                q.AddTrigger(t => t
                    .ForJob("ReminderJob")
                    .WithIdentity("ReminderTrigger")
                    .WithCronSchedule("0 0/1 * 1/1 * ? *"));
            });

            services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);
        }
    }
}
