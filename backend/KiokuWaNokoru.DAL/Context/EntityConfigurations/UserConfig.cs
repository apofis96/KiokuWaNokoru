using KiokuWaNokoru.DAL.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KiokuWaNokoru.DAL.Context.EntityConfigurations
{
    public class UserConfig : BaseEntityConfig<User>
    {
        public override void Configure(EntityTypeBuilder<User> builder)
        {
            base.Configure(builder);

            builder.Property(u => u.Username)
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(255);
            builder.Property(u => u.Password)
                .IsRequired()
                .HasMaxLength(255);
            builder.Property(u => u.Salt)
                .IsRequired()
                .HasMaxLength(255);
            builder.HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}
