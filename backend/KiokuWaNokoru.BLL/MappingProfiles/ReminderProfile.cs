using AutoMapper;
using KiokuWaNokoru.Common.DTO.Reminder;
using KiokuWaNokoru.DAL.Entities;

namespace KiokuWaNokoru.BLL.MappingProfiles
{
    public class ReminderProfile : Profile
    {
        public ReminderProfile()
        {
            CreateMap<CreateReminderDto, Reminder>();
            CreateMap<UpdateReminderDto, Reminder>();
            CreateMap<Reminder, ReminderDto>();
        }
    }
}
