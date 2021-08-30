using ServerAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerAPI
{
    public class Seeder
    {
        private readonly ShopDbContext _dbContext;

        public Seeder(ShopDbContext DbContext)
        {
            _dbContext = DbContext;
        }

        public void Seed()
        {
            if (_dbContext.Roles.Any()) return;

            var roles = GetRoles();
            _dbContext.Roles.AddRange(roles);
            _dbContext.SaveChanges();
        }

        public IEnumerable<Role> GetRoles()
        {
            var roles = new List<Role>()
            {
                new Role() {Name = "User"},
                new Role() {Name = "Manager"},
                new Role() {Name = "Admin"}
            };
            return roles;
        }
    }
}
