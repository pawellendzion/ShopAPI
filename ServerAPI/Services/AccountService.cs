using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ServerAPI.Entities;
using ServerAPI.Exceptions;
using ServerAPI.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ServerAPI.Services
{
    public interface IAccountService
    {
        public Task<string> Login(LoginDto dto);
        public Task Register(RegisterDto dto);
        public Task<UserDto> GetDetails(int id);
        public Task<IEnumerable<UserDto>> GetUsers();
        public Task ChangeRole(int id, string newRole);
    }

    public class AccountService : IAccountService
    {
        private readonly ShopDbContext _dbContext;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AccountService(
            ShopDbContext dbContext,
            AuthenticationSettings authenticationSettings,
            IPasswordHasher<User> passwordHasher)
        {
            _dbContext = dbContext;
            _authenticationSettings = authenticationSettings;
            _passwordHasher = passwordHasher;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="dto"></param>
        /// <returns>JWT token</returns>
        public async Task<string> Login(LoginDto dto)
        {
            var user = await _dbContext.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user is null) throw new UserNotFoundException("user not found");

            var matchingPassword = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
            if (matchingPassword == PasswordVerificationResult.Failed) throw new UserNotFoundException("user not found");

            return GenerateJwtToken(user);
        }

        public async Task Register(RegisterDto dto)
        {
            var existUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (existUser is User)
            {
                throw new UserExistException("user exist");
            }

            var newUser = new User()
            {
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                RoleId = 1,
                DateOfCreate = DateTime.Now.ToString("yyyy-MM-dd")
            };

            var passwordHashed = _passwordHasher.HashPassword(newUser, dto.Password);
            newUser.PasswordHash = passwordHashed;

            await _dbContext.Users.AddAsync(newUser);
            await _dbContext.SaveChangesAsync();
        }
        
        public async Task<UserDto> GetDetails(int id)
        {
            var user = await _dbContext.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Id == id);

            if (user is null) throw new UserNotFoundException("user not found");

            var userDetails = new UserDto()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                RoleName = user.Role.Name,
                DateOfCreate = user.DateOfCreate
            };

            return userDetails;
        }

        public async Task<IEnumerable<UserDto>> GetUsers()
        {
            var users = await _dbContext.Users.Include(u => u.Role).Select(u => u).ToListAsync();
            List<UserDto> usersDto = new();
            users.ForEach(u =>
            {
                usersDto.Add(new UserDto()
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    DateOfCreate = u.DateOfCreate,
                    RoleName = u.Role.Name
                });
            });

            return usersDto;
        }

        public async Task ChangeRole(int id, string newRole)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);

            int roleId = 1;
            switch(newRole)
            {
                case "User": roleId = 1; break;
                case "Manager": roleId = 2; break;
                case "Admin": roleId = 3; break;
            }

            user.RoleId = roleId;

            _dbContext.Entry(user).Property(u => u.RoleId).IsModified = true;
            _dbContext.SaveChanges();
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>()
            {
                new Claim("Id", user.Id.ToString()),
                new Claim("FirstName", user.FirstName),
                new Claim("LastName", user.LastName),
                new Claim("Roles", user.Role.Name),
                new Claim(ClaimTypes.Role, user.Role.Name)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expire = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);

            var token = new JwtSecurityToken(
                _authenticationSettings.JwtIssuer,
                _authenticationSettings.JwtIssuer,
                claims,
                expires: expire,
                signingCredentials: cred
            );

            var tokenHandler = new JwtSecurityTokenHandler();
            var result = tokenHandler.WriteToken(token);
            return result;
        }
    }
}