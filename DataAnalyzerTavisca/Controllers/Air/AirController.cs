using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DataAnalyzerTavisca.Controllers.Air
{
    public class AirController : ApiController
    {
        // GET: api/Air
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Air/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Air
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Air/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Air/5
        public void Delete(int id)
        {
        }
    }
}
