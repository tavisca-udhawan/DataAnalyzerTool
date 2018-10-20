using CoreContracts.Models;
using Microsoft.AspNetCore.Mvc;
using TaviscaDataAnalyzerServiceProvider;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaviscaDataAnalyzerTool.Controllers.Air
{
    [Route("api/Air/")]
    public class AirController : Controller
    {

        IAirWebApiService webApiServiceProvider;
        public AirController(IAirWebApiService _webApiServiceProvider)
        {
            webApiServiceProvider = _webApiServiceProvider;
        }
        [HttpGet("PaymentType")]

        public object GetPaymentType([FromQuery]string fromDate, string toDate)
        {
            UIRequest uiRequest = new UIRequest { FromDate = fromDate, ToDate = toDate };            
            return webApiServiceProvider.AirPaymentTypeService(uiRequest);
        }

        [HttpGet("MarketingAirlineBookingInfo")]

        public object GetMarketingAirlineBookingInfo([FromQuery] string fromDate, string toDate)
        {
            UIRequest uiRequest = new UIRequest { FromDate = fromDate, ToDate = toDate };           
            return webApiServiceProvider.MarketingAirlineBookingsInfoService(uiRequest);
        }

        [HttpGet("FailureCount")]

        public object GetFailureCountInfo([FromQuery] string fromDate, string toDate)
        {
            UIRequest uiRequest = new UIRequest { FromDate = fromDate, ToDate = toDate };            
            return webApiServiceProvider.FailureCountInfoService(uiRequest);
        }

        [HttpGet("TotalBookings")]

        public object GetTotalBookingsInfo()
        {           
            return webApiServiceProvider.TotalBookingsInfoService();
        }


        [HttpGet("BookingsWithinDateRange")]

        public object GetBookingsWithinDateRangeInfo([FromQuery] string fromDate, string toDate)
        {
            UIRequest uiRequest = new UIRequest { FromDate = fromDate, ToDate = toDate };            
            return webApiServiceProvider.BookingsWithinDateRangeInfoService(uiRequest);
        }
    }
}
