using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerAPI.Models.FilterModels
{
    [BindProperties]
    public class LaptopFilterModel : FilterModel
    {
        public string Cpu { get; set; }
        public string Graphic { get; set; }
        public string ScreenSize { get; set; }
    }
}
