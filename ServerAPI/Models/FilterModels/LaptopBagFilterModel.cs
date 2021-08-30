using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerAPI.Models.FilterModels
{
    [BindProperties]
    public class LaptopBagFilterModel : FilterModel
    {
        public string LaptopScreenSize { get; set; }
    }
}
