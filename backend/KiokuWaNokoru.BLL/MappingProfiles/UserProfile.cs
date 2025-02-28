using AutoMapper;
using KiokuWaNokoru.Common.DTO.User;
using KiokuWaNokoru.DAL.Entities;

namespace KiokuWaNokoru.BLL.MappingProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>();
        }
    }
}
