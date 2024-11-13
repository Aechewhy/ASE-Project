using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VST111.Controllers
{
        internal class BaseController : System.Mvc.Controller
        {
            public object Index() => View();
        }
}
