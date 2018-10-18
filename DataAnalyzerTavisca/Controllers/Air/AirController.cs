using TaviscaDataAnalyzerDatabase.Models.Flights;
using TaviscaDataAnalyzerDatabase.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Caching;
using System.Web.Http;
using TaviscaDataAnalyzerServiceProvider;

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
        [HttpGet]
        [Route ("api/Air/PaymentType")]
        public object GetPaymentType([FromUri] string fromDate, string toDate)
        {
            UIRequest uiRequest = new UIRequest { FromDate = fromDate, ToDate = toDate };
            IAirWebApiService webApiServiceProvider = new AirWebApiService();
            List<AirPaymentType> airPaymentType = JsonConvert.DeserializeObject<List<AirPaymentType>>(webApiServiceProvider.AirPaymentTypeService(uiRequest));
            return airPaymentType;
        }

       
    }
}
