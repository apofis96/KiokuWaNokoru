﻿namespace KiokuWaNokoru.Common.DTO.User
{
    public class CreateUserDto
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
