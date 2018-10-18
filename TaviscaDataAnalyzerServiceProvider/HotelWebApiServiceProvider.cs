using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaviscaDataAnalyzerCache;
using TaviscaDataAnalyzerDatabase;
using TaviscaDataAnalyzerDatabase.Models;

namespace TaviscaDataAnalyzerServiceProvider
{
    public class HotelWebApiServiceProvider : IHotelWebApiServiceProvider
    {
        ICache cache;
        public HotelWebApiServiceProvider()
        {
            cache = new TaviscaDataAnalyzerCache.RedisCache();
        }
        public string BookingDatesService(UIRequest query)
        {
            string result = null;
            string data = "BookingDates" + query.Filter + query.FromDate + query.ToDate;
            result = cache.Get(data);
            if (result == null)
            {
                IHotelRepository sqlDatabase = new HotelSqlDatabase();
                result = sqlDatabase.BookingDatesDatabase(query);
                cache.Post(data, result);
            }
            return result;
        }

        public string FailureCountService(UIRequest query)
        {
            string result = null;
            string data = "FailureCount";
            result = cache.Get(data);
            if (result == null)
            {
                IHotelRepository sqlDatabase = new HotelSqlDatabase();
                result = sqlDatabase.FailureCountDataBase(query);
                cache.Post(data, result);
            }
            return result;
        }

        public string GetAllLocationsService()
        {
            string result = null;
            string data = "AllLocations";
            result = cache.Get(data);
            if (result == null)
            {
                IHotelRepository sqlDatabase = new HotelSqlDatabase();
                result = sqlDatabase.GetAllLocationsDatabase();
                cache.Post(data, result);
            }
            return result;
        }

        public string HotelNameWithDatesService(UIRequest query)
        {
            string result = null;
            string data = query.ToDate + query.Filter + query.FromDate;
            result = cache.Get(data);
            if (result == null)
            {
                IHotelRepository sqlDatabase = new HotelSqlDatabase();
                result = sqlDatabase.HotelNameWithDatesDatabases(query);
                cache.Post(data, result);
            }
            return result;
        }

        public string HotelsAtALocationWithDatesService(UIRequest query)
        {
            string result = null;
            string data = query.ToDate + query.FromDate;
            result = cache.Get(data);
            if (result == null)
            {
                IHotelRepository sqlDatabase = new HotelSqlDatabase();
                result = sqlDatabase.HotelsAtALocationWithDatesDatabases(query);
                cache.Post(data, result);
            }
            return result;
        }

        public string PaymentDetailsService(UIRequest query)
        {
            string result = null;
            string data = query.ToDate + query.FromDate + "Payment" + query.Filter;
            result = cache.Get(data);
            if (result == null)
            {
                IHotelRepository sqlDatabase = new HotelSqlDatabase();
                result = sqlDatabase.PaymentDetailsDatabase(query);
                cache.Post(data, result);
            }
            return result;
        }

        public string SupplierNamesWithDatesService(UIRequest query)
        {
            string result = null;
            string data = query.ToDate + query.FromDate + query.Filter;
            result = cache.Get(data);
            if (result == null)
            {
                IHotelRepository sqlDatabase = new HotelSqlDatabase();
                result = sqlDatabase.SupplierNamesWithDatesDatabase(query);
                cache.Post(data, result);
            }
            return result;
        }

        public string TotalHotelBookingsService()
        {
            string result = null;
            string data = "TotalHotelBookings";
            result = cache.Get(data);
            if (result == null)
            {
                IHotelRepository sqlDatabase = new HotelSqlDatabase();
                result = sqlDatabase.TotalHotelBookingsDataBase();
                cache.Post(data, result);
            }
            return result;
        }
    }
}
