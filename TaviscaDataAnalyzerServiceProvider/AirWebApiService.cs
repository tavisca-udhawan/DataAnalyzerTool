using System;
using System.Collections.Generic;
using TaviscaDataAnalyzerCache;
using TaviscaDataAnalyzerDatabase;
using TaviscaDataAnalyzerDatabase.Models;

namespace TaviscaDataAnalyzerServiceProvider
{
    public class AirWebApiService : IAirWebApiService
    {
        ICache cache;
        public AirWebApiService()
        {
            cache = new RedisCache();
        }
        public string AirPaymentTypeService(UIRequest uIRequest)
        {
            string result = null;
            string data = "AirPaymentType" + uIRequest.FromDate + uIRequest.ToDate;
            result = cache.Get(data);
            if (result == null)
            {
                IAirRepository sqlDatabase = new AirSqlDatabase();
                result = sqlDatabase.AirPaymentTypeDatabase(uIRequest);
                cache.Post(data, result);
            }
            return result;

        }

        public string BookingsWithinDateRangeInfoService(UIRequest uIRequest)
        {
            string result = null;
            string data = "BookingsWithinDateRange" + uIRequest.FromDate + uIRequest.ToDate;
            result = cache.Get(data);
            if (result == null)
            {
                IAirRepository sqlDatabase = new AirSqlDatabase();
                result = sqlDatabase.BookingsWithinDateRangeInfoDatabase(uIRequest);
                cache.Post(data, result);
            }
            return result;
        }

        public string FailureCountInfoService(UIRequest uIRequest)
        {
            string result = null;
            string data = "AirFailureCount" + uIRequest.FromDate + uIRequest.ToDate;
            result = cache.Get(data);
            if (result == null)
            {
                IAirRepository sqlDatabase = new AirSqlDatabase();
                result = sqlDatabase.AirFailureCountDatabase(uIRequest);
                cache.Post(data, result);
            }
            return result;
        }

        public string MarketingAirlineBookingsInfoService(UIRequest uIRequest)
        {
            string result = null;
            string data = "MarketingAirLine" + uIRequest.FromDate + uIRequest.ToDate;
            result = cache.Get(data);
            if (result == null)
            {
                IAirRepository sqlDatabase = new AirSqlDatabase();
                result = sqlDatabase.MarketingAirlineBookingsInfoDatabase(uIRequest);
                cache.Post(data, result);
            }
            return result;
        }

        public string TotalBookingsInfoService()
        {
            string result = null;
            string data = "AirTotalBookingsCount";
            result = cache.Get(data);
            if (result == null)
            {
                IAirRepository sqlDatabase = new AirSqlDatabase();
                result = sqlDatabase.TotalBookingsInfoDatabase();
                cache.Post(data, result);
            }
            return result;
        }
    }
}
