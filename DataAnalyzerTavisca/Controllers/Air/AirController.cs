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

        [HttpGet]
        [Route("api/Air/MarketingAirlineBookingInfo")]
        public object GetMarketingAirlineBookingInfo([FromUri] string fromDate, string toDate)
        {
            UIRequest uiRequest = new UIRequest { FromDate = fromDate, ToDate = toDate };
            IAirWebApiService webApiServiceProvider = new AirWebApiService();
            List<MarketingAirlineBookings> airPaymentType = JsonConvert.DeserializeObject<List<MarketingAirlineBookings>>(webApiServiceProvider.MarketingAirlineBookingsInfoService(uiRequest));
            return airPaymentType;
        }

        [HttpGet]
        [Route("api/Air/FailureCount")]
        public object GetFailureCountInfo([FromUri] string fromDate, string toDate)
        {
            UIRequest uiRequest = new UIRequest { FromDate = fromDate, ToDate = toDate };
            IAirWebApiService webApiServiceProvider = new AirWebApiService();
            FailureCount airPaymentType = JsonConvert.DeserializeObject<FailureCount>(webApiServiceProvider.FailureCountInfoService(uiRequest));
            return airPaymentType;
        }

        [HttpGet]
        [Route("api/Air/TotalBookings")]
        public object GetTotalBookingsInfo()
        {
            IAirWebApiService webApiServiceProvider = new AirWebApiService();
            List<TotalBookings> totatlBookings = JsonConvert.DeserializeObject<List<TotalBookings>>(webApiServiceProvider.TotalBookingsInfoService());
            return totatlBookings;
        }
    }
}
