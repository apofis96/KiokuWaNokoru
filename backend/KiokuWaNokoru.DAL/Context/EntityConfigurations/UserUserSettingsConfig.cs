using KiokuWaNokoru.DAL.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KiokuWaNokoru.DAL.Context.EntityConfigurations
{
    public class UserUserSettingsConfig : BaseEntityConfig<UserSettings>
    {
        public override void Configure(EntityTypeBuilder<UserSettings> builder)
        {
            base.Configure(builder);

            builder.HasOne(u => u.User)
                .WithOne(u => u.UserSettings);
        }
    }
}
