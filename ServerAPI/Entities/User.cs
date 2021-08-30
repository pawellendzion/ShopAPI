using System;
using System.ComponentModel.DataAnnotations;

namespace ServerAPI.Entities
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string DateOfCreate { get; set; }

        public int RoleId { get; set; }
        public Role Role { get; set; }
    }
}
