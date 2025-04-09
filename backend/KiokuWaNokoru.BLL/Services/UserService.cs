using AutoMapper;
using KiokuWaNokoru.BLL.Interfaces;
using KiokuWaNokoru.Common.DTO.User;
using KiokuWaNokoru.Common.Utils;
using KiokuWaNokoru.DAL.Context;
using KiokuWaNokoru.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace KiokuWaNokoru.BLL.Services
{
    public class UserService(KiokuWaNokoruContext context, IJwtService jwtService, IMapper mapper) : IUserService
    {
        public async Task<UserDto> CreateUserAsync(CreateUserDto userDto)
        {
            (var hash, var salt) = ArgonHashUtil.Hash(userDto.Password);

            User user = new()
            {
                Username = userDto.Username,
                Email = userDto.Email.ToLowerInvariant(),
                Password = hash,
                Salt = salt,
                UserSettings = new (),
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return mapper.Map<UserDto>(user);
        }

        public async Task<UserLoginResponseDto> LoginUserAsync(UserLoginRequestDto userLoginDto)
        {
            var userLoginInfo = await context.Users
                .Where(u => u.Email == userLoginDto.Email.ToLowerInvariant())
                .Select(u => new
                {
                    u.Id,
                    u.Password,
                    u.Salt,
                    u.Email,
                }).FirstOrDefaultAsync() ?? throw new KeyNotFoundException();

            var isVerified = ArgonHashUtil.Verify(userLoginDto.Password, userLoginInfo.Salt, userLoginInfo.Password);
            if (!isVerified)
            {
                throw new KeyNotFoundException();
            }

            var token = jwtService.GenerateToken(userLoginInfo.Id);

            return new UserLoginResponseDto
            {
                AccessToken = token,
            };
        }
    }
}
