using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaviscaDataAnalyzerDatabase.Models;

namespace TaviscaDataAnalyzerServiceProvider
{
   public interface IAirWebApiService
    {
        string AirPaymentTypeService(UIRequest uIRequest);
        string MarketingAirlineBookingsInfoService(UIRequest uIRequest);
    }
}
