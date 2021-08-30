using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerAPI.Entities
{
    public class Laptop : Product
    {
        public string Cpu { get; set; }
        public string Graphic { get; set; }
        public float ScreenSize { get; set; }
    }
}
