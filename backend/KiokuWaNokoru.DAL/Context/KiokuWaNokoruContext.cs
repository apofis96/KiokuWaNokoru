﻿using KiokuWaNokoru.DAL.Entities;
using KiokuWaNokoru.DAL.Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace KiokuWaNokoru.DAL.Context
{
    public class KiokuWaNokoruContext(DbContextOptions<KiokuWaNokoruContext> options) : DbContext(options)
    {
        public DbSet<Reminder> Reminders => Set<Reminder>();
        public DbSet<User> Users => Set<User>();
        public DbSet<UserBotIntegration> UserBotIntegrations => Set<UserBotIntegration>();
        public DbSet<UserSettings> UserSettings => Set<UserSettings>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(KiokuWaNokoruContext).Assembly);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = new())
        {
            foreach (var entry in ChangeTracker.Entries())
            {
                if (entry.Entity is not BaseEntity entity)
                {
                    continue;
                }

                if (entry.State == EntityState.Added)
                {
                    entity.CreatedAt = DateTime.UtcNow;
                    entity.UpdatedAt = DateTime.UtcNow;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entity.UpdatedAt = DateTime.UtcNow;
                }
            }

            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }
    }
}
