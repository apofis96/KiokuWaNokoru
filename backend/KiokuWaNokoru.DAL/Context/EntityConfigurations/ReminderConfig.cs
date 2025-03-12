using KiokuWaNokoru.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KiokuWaNokoru.DAL.Context.EntityConfigurations
{
    public class ReminderConfig : BaseEntityConfig<Reminder>
    {
        public override void Configure(EntityTypeBuilder<Reminder> builder)
        {
            base.Configure(builder);

            builder.Property(r => r.Title)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(r => r.Description)
                .HasMaxLength(500);
            builder.Property(r => r.IsRecurring)
                .IsRequired();
            builder.Property(r => r.RecurrenceType)
                .IsRequired();
            builder.Property(r => r.RecurrenceValue)
                .HasMaxLength(50)
                .IsRequired();
            builder.HasOne(u => u.User);
        }
    }
}
