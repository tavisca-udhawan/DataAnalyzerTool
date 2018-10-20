using CoreContracts.Models;

namespace TaviscaDataAnalyzerDatabase
{
    public interface IHotelRepository
    {
        string GetAllLocationsDatabase();
        string HotelsAtALocationWithDatesDatabases(UIRequest query);

        string SupplierNamesWithDatesDatabase(UIRequest query);
        string HotelNameWithDatesDatabases(UIRequest query);
        string BookingDatesDatabase(UIRequest query);
        string FailureCountDataBase(UIRequest query);
        string PaymentDetailsDatabase(UIRequest query);

        string TotalHotelBookingsDataBase();
    }
}
