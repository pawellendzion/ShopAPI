using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServerAPI.Entities;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using ServerAPI.Models;
using ServerAPI.Models.FilterModels;

namespace ServerAPI.Controllers
{
    [Route("products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ShopDbContext _dbContext;

        public ProductController(ShopDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPost("upload/{id}"), DisableRequestSizeLimit]
        public async Task<ActionResult> UploadImage([FromRoute]int id)
        {
            var file = Request.Form.Files[0];
            var folderName = Path.Combine("Resources", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            
            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
                product.dbPath = dbPath;
                _dbContext.Entry(product).Property(p => p.dbPath).IsModified = true;
                await _dbContext.SaveChangesAsync();

                return Created("", null);
            }
            else
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPost("upload/laptop")]
        public async Task<ActionResult> UploadStatsLaptop([FromBody]Laptop laptop)
        {
            await _dbContext.Laptops.AddAsync(laptop);
            await _dbContext.SaveChangesAsync();

            return Created("", laptop.Id);
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPost("upload/laptopBag")]
        public async Task<ActionResult> UploadStatsLaptopBag([FromBody] LaptopBag laptopBag)
        {
            await _dbContext.LaptopBags.AddAsync(laptopBag);
            await _dbContext.SaveChangesAsync();

            return Created("", laptopBag.Id);
        }

        [HttpGet("{count}")]
        public async Task<ActionResult> GetCount([FromRoute]int count)
        {
            var products = _dbContext.Products.Select(p => p).OrderBy(p => p.Id);
            var result = await products.Skip(Math.Max(0, await products.CountAsync() - count)).ToListAsync();
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var proudcts = new List<Product>();
    
            proudcts = await _dbContext.Products.Select(p => p).ToListAsync();
            return Ok(proudcts);
        }

        [HttpGet("filter/search")]
        public async Task<ActionResult> GetSearched([FromQuery]string prop)
        {
            var result = new List<string>();

            switch (prop)
            {
                // Laptop
                case "cpu": result = await _dbContext.Laptops.Select(p => p.Cpu).ToListAsync(); break;
                case "graphic": result = await _dbContext.Laptops.Select(p => p.Graphic).ToListAsync(); break;
                case "screenSize": result = await _dbContext.Laptops.Select(p => p.ScreenSize.ToString()).ToListAsync(); break;

                // LaptopBag
                case "laptopScreenSize": result = await _dbContext.LaptopBags.Select(p => p.LaptopScreenSize.ToString()).ToListAsync(); break;
            }

            return Ok(result);
        }

        [HttpGet("filter/search-products-by-name")]
        public async Task<ActionResult> GetProductsByName([FromQuery]string name)
        {
            var products = await _dbContext.Products.Select(p => p).Where(p => p.Name.Contains(name.Trim())).ToListAsync();

            return Ok(products);
        }

        [HttpGet("filter")]
        public async Task<ActionResult> GetFilteredDefault([FromQuery]FilterModel filter)
        {
            var products = await _dbContext.Products
                .Select(p => p)
                .Where(p => p.Price >= filter.PriceFrom && p.Price <= filter.PriceTo).ToListAsync();

            return Ok(products);
        }

        [HttpGet("filter/laptop")]
        public async Task<ActionResult> GetFilteredLaptops([FromQuery]LaptopFilterModel laptopFilter)
        {
            var laptops = await _dbContext.Laptops
                .Select(l => l)
                .Where(l => laptopFilter.Cpu == null || laptopFilter.Cpu == l.Cpu)
                .Where(l => laptopFilter.Graphic == null || laptopFilter.Graphic == l.Graphic)
                .Where(l => laptopFilter.ScreenSize == null || laptopFilter.ScreenSize == l.ScreenSize.ToString())
                .Where(p => p.Price >= laptopFilter.PriceFrom && p.Price <= laptopFilter.PriceTo)
                .ToListAsync();

            return Ok(laptops);
        }

        [HttpGet("filter/laptopBag")]
        public async Task<ActionResult> GetFilteredLaptopBags([FromQuery] LaptopBagFilterModel laptopBagFilter)
        {
            var laptops = await _dbContext.LaptopBags
                .Select(lb => lb)
                .Where(lb => laptopBagFilter.LaptopScreenSize == null || laptopBagFilter.LaptopScreenSize == lb.LaptopScreenSize.ToString())
                .Where(p => p.Price >= laptopBagFilter.PriceFrom && p.Price <= laptopBagFilter.PriceTo)
                .ToListAsync();

            return Ok(laptops);
        }

        [HttpGet("details/{id}")]
        public async Task<ActionResult> GetProductDetails([FromRoute]int id)
        {
            var category = (await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id)).Category;

            if (category is null) return NotFound();

            dynamic product;

            switch(category)
            {
                case "laptop":
                    product = await _dbContext.Laptops.FirstOrDefaultAsync(l => l.Id == id);
                    break;

                case "laptopBag":
                    product = await _dbContext.LaptopBags.FirstOrDefaultAsync(lb => lb.Id == id);
                    break;

                default:
                    return NotFound();
            }

            return Ok(product);
        }
    }
}
