using KiokuWaNokoru.DAL.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KiokuWaNokoru.DAL.Context.EntityConfigurations
{
    public class UserBotIntegrationConfig : BaseEntityConfig<UserBotIntegration>
    {
        public override void Configure(EntityTypeBuilder<UserBotIntegration> builder)
        {
            base.Configure(builder);

            builder.Property(u => u.ChatToken)
                .HasMaxLength(255);

            builder.HasOne(u => u.User)
                .WithMany(u => u.UserBotIntegrations);
        }
    }
}
