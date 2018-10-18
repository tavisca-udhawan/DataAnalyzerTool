using TaviscaDataAnalyzerDatabase.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaviscaDataAnalyzerDatabase
{
    public interface IRepository
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
