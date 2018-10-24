using CoreContracts.Models;
using CoreContracts.Models.Hotels;
using Newtonsoft.Json;
using System.Collections.Generic;
using TaviscaDataAnalyzerCache;
using TaviscaDataAnalyzerDatabase;


namespace TaviscaDataAnalyzerServiceProvider
{
    public class HotelWebApiServiceProvider : IHotelWebApiServiceProvider
    {
        IHotelRepository sqlDatabase;
        ICache cache;
        public HotelWebApiServiceProvider(IHotelRepository _sqlDatabase)
        {
            cache = new RedisCache();
            sqlDatabase = _sqlDatabase;
        }
        public object BookingDatesService(UIRequest query)
        {
            string result = null;
            string data = "BookingDates" + query.Filter + query.FromDate + query.ToDate;
            result = cache.Get(data);
            if (result == null)
            {
                 
                result = sqlDatabase.BookingDatesDatabase(query);
                cache.Post(data, result);
            }
            List<HotelBookingDates> hotelBookingDates = JsonConvert.DeserializeObject<List<HotelBookingDates>>(result);
            return hotelBookingDates;
        }

        public object FailureCountService(UIRequest query)
        {
            string result = null;
            string data = "FailureCount";
            result = cache.Get(data);
            if (result == null)
            {
          
                result = sqlDatabase.FailureCountDataBase(query);
                cache.Post(data, result);
            }
            FailuresInBooking FailureCount = JsonConvert.DeserializeObject<FailuresInBooking>(result);
            return FailureCount;
        }

        public object GetAllLocationsService()
        {
            string result = null;
            string data = "AllLocations";
            result = cache.Get(data);
            if (result == null)
            {

                result = sqlDatabase.GetAllLocationsDatabase();
                cache.Post(data, result);
            }
            Cities ListOfCities = JsonConvert.DeserializeObject<Cities>(result);
            return ListOfCities;
        }

        public object HotelNameWithDatesService(UIRequest query)
        {
            string result = null;
            string data = query.ToDate + query.Filter + query.FromDate;
            result = cache.Get(data);
            if (result == null)
            {

                result = sqlDatabase.HotelNameWithDatesDatabases(query);
                cache.Post(data, result);
            }
            List<HotelNamesWithBookings> ListOfHotelNamesWithDates = JsonConvert.DeserializeObject<List<HotelNamesWithBookings>>(result);
            return ListOfHotelNamesWithDates;
        }

        public object HotelsAtALocationWithDatesService(UIRequest query)
        {
            string result = null;
            string data = query.ToDate + query.FromDate;
            result = cache.Get(data);
            if (result == null)
            {

                result = sqlDatabase.HotelsAtALocationWithDatesDatabases(query);
                cache.Post(data, result);
            }
            List<HotelsInALocationWithDates> ListOfHotelsWithDates = JsonConvert.DeserializeObject<List<HotelsInALocationWithDates>>(result);
            return ListOfHotelsWithDates;
        }

        public object PaymentDetailsService(UIRequest query)
        {
            string result = null;
            string data = query.ToDate + query.FromDate + "Payment" + query.Filter;
            result = cache.Get(data);
            if (result == null)
            {

                result = sqlDatabase.PaymentDetailsDatabase(query);
                cache.Post(data, result);
            }
            List<PaymentDetails> payment = JsonConvert.DeserializeObject<List<PaymentDetails>>(result);
            return payment;
        }

        public object SupplierNamesWithDatesService(UIRequest query)
        {
            string result = null;
            string data = query.ToDate + query.FromDate + query.Filter;
            result = cache.Get(data);
            if (result == null)
            {
                
                result = sqlDatabase.SupplierNamesWithDatesDatabase(query);
                cache.Post(data, result);
            }
            List<IndividualSupplierBookings> ListOfSuppliers = JsonConvert.DeserializeObject<List<IndividualSupplierBookings>>(result);
            return ListOfSuppliers;
        }

        public object TotalHotelBookingsService()
        {
            string result = null;
            string data = "TotalHotelBookings";
            result = cache.Get(data);
            if (result == null)
            {
                
                result = sqlDatabase.TotalHotelBookingsDataBase();
                cache.Post(data, result);
            }
            List<TotalHotelBookings> totalHotelBookings = JsonConvert.DeserializeObject<List<TotalHotelBookings>>(result);
            return totalHotelBookings;
        }
    }
}
