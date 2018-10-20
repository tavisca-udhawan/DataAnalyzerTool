using CoreContracts.Models;

namespace TaviscaDataAnalyzerServiceProvider
{
    public interface IHotelWebApiServiceProvider
    {
        object GetAllLocationsService();
        object HotelsAtALocationWithDatesService(UIRequest query);
        object HotelNameWithDatesService(UIRequest query);

        object SupplierNamesWithDatesService(UIRequest query);
        object FailureCountService(UIRequest query);
        object PaymentDetailsService(UIRequest query);
        object BookingDatesService(UIRequest query);
        object TotalHotelBookingsService();
    }
}
