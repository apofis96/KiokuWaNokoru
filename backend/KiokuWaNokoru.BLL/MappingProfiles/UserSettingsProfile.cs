using AutoMapper;
using KiokuWaNokoru.Common.DTO.UserSettings;
using KiokuWaNokoru.DAL.Entities;

namespace KiokuWaNokoru.BLL.MappingProfiles
{
    public class UserSettingsProfile : Profile
    {
        public UserSettingsProfile()
        {
            CreateMap<UserSettings, UserSettingsDto>();
        }
    }
}
