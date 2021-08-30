using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerAPI.Models
{
    [BindProperties]
    public class FilterModel
    {
        public decimal PriceFrom { get; set; }
        public decimal PriceTo { get; set; }
    }
}
