using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        public TokenService TokenService { get; }
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            this.TokenService = tokenService;
            this.userManager = userManager;

        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await this.userManager.FindByEmailAsync(loginDTO.Email);
            if (user == null) return Unauthorized();
            var result = await this.userManager.CheckPasswordAsync(user, loginDTO.Password);
            if (result)
            {
                return CreateUserObject(user);
            }
            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await this.userManager.Users.AnyAsync(x => x.UserName == registerDTO.Username))
            {
                ModelState.AddModelError("username", "username is already taken");
                return ValidationProblem();
            }

            if (await this.userManager.Users.AnyAsync(x => x.Email == registerDTO.Email))
            {
                ModelState.AddModelError("email", "Email is already taken");
                return ValidationProblem();
            }
            var user = new AppUser { DisplayName = registerDTO.DisplayName, Email = registerDTO.Email, UserName = registerDTO.Username };
            var result = await this.userManager.CreateAsync(user, registerDTO.Password);
            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }
            return BadRequest(result.Errors);
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await this.userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return CreateUserObject(user);
        }


        private UserDTO CreateUserObject(AppUser user)
        {
            return new UserDTO
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = this.TokenService.CreateToken(user),
                Username = user.UserName
            };
        }
    }
}