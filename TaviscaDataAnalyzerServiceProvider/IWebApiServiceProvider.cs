using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaviscaDataAnalyzerDatabase.Models;

namespace TaviscaDataAnalyzerServiceProvider
{
    public interface IWebApiServiceProvider
    {
        string GetAllLocationsCache();
        string HotelsAtALocationWithDatesCache(UIRequest query);
        string HotelNameWithDatesCache(UIRequest query);

        string SupplierNamesWithDatesCache(UIRequest query);
        string FailureCountCache(UIRequest query);
        string PaymentDetailsCache(UIRequest query);
        string BookingDatesCache(UIRequest query);
        string TotalHotelBookingsCache();
    }
}
