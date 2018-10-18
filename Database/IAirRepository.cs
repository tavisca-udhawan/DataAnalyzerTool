using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaviscaDataAnalyzerDatabase.Models;

namespace TaviscaDataAnalyzerDatabase
{
   public interface IAirRepository
    {
        string AirPaymentTypeDatabase(UIRequest uIRequest);
        string MarketingAirlineBookingsInfoDatabase(UIRequest uIRequest);
        string AirFailureCountDatabase(UIRequest uIRequest);
        string TotalBookingsInfoDatabase();
        string BookingsWithinDateRangeInfoDatabase(UIRequest uIRequest);
    }
}
