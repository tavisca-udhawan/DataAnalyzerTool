using CoreContracts.Models;
using CoreContracts.Models.Air;

namespace TaviscaDataAnalyzerDatabase
{
    public interface IAirRepository
    {
        string AirPaymentTypeDatabase(UIRequest uIRequest);
        string MarketingAirlineBookingsInfoDatabase(UIRequest uIRequest);
        string AirFailureCountDatabase(UIRequest uIRequest);
        string TotalBookingsInfoDatabase();
        string BookingsWithinDateRangeInfoDatabase(UIRequest uIRequest);
        string BookingsForSpecificTripDatabase(TripBookingRequest uIRequest);
    }
}
