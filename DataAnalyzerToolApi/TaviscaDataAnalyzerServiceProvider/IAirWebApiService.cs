using CoreContracts.Models;
using CoreContracts.Models.Air;

namespace TaviscaDataAnalyzerServiceProvider
{
   public interface IAirWebApiService
    {
        object AirPaymentTypeService(UIRequest uIRequest);
        object MarketingAirlineBookingsInfoService(UIRequest uIRequest);
        object FailureCountInfoService(UIRequest uIRequest);
        object TotalBookingsInfoService();
        object BookingsWithinDateRangeInfoService(UIRequest uIRequest);
        object BookingsForSpecificTripService(TripBookingRequest uIRequest);
    }
}
