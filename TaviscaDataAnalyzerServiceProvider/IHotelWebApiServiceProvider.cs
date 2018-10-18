using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaviscaDataAnalyzerDatabase.Models;

namespace TaviscaDataAnalyzerServiceProvider
{
    public interface IHotelWebApiServiceProvider
    {
        string GetAllLocationsService();
        string HotelsAtALocationWithDatesService(UIRequest query);
        string HotelNameWithDatesService(UIRequest query);

        string SupplierNamesWithDatesService(UIRequest query);
        string FailureCountService(UIRequest query);
        string PaymentDetailsService(UIRequest query);
        string BookingDatesService(UIRequest query);
        string TotalHotelBookingsService();
    }
}
