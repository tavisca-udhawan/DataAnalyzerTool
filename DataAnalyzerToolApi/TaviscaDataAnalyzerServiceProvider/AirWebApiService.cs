using CoreContracts.Models;
using CoreContracts.Models.Air;
using Newtonsoft.Json;
using System.Collections.Generic;
using TaviscaDataAnalyzerCache;
using TaviscaDataAnalyzerDatabase;

namespace TaviscaDataAnalyzerServiceProvider
{
    public class AirWebApiService : IAirWebApiService
    {
        ICache cache;
        IAirRepository sqlDatabase;
        public AirWebApiService(IAirRepository _sqlDatabase)
        {
            cache = new RedisCache();
            sqlDatabase = _sqlDatabase;
        }
        public object AirPaymentTypeService(UIRequest uIRequest)
        {
            string result = null;
            string data = "AirPaymentType" + uIRequest.FromDate + uIRequest.ToDate;
            result = cache.Get(data);
            if (result == null)
            {
                result = sqlDatabase.AirPaymentTypeDatabase(uIRequest);
                cache.Post(data, result);
            }
            List<AirPaymentType> airPaymentType = JsonConvert.DeserializeObject<List<AirPaymentType>>(result);
            return airPaymentType;

        }

        public object BookingsWithinDateRangeInfoService(UIRequest uIRequest)
        {
            string result = null;
            string data = "BookingsWithinDateRange" + uIRequest.FromDate + uIRequest.ToDate;
            result = cache.Get(data);
            if (result == null)
            {                
                result = sqlDatabase.BookingsWithinDateRangeInfoDatabase(uIRequest);
                cache.Post(data, result);
            }
            List<DatesWithBookings> dateWithBookings = JsonConvert.DeserializeObject<List<DatesWithBookings>>(result);
            return dateWithBookings;
        }

        public object BookingsForSpecificTripService(TripBookingRequest uIRequest)
        {
            string result = null;
            string data = "BookingInfoForTrip" + uIRequest.ArrivalAirportCode + uIRequest.FromDate + uIRequest.ToDate + uIRequest.ArrivalAirportCode;
            result = cache.Get(data);
            if (result == null)
            {
                result = sqlDatabase.BookingsForSpecificTripDatabase(uIRequest);
                cache.Post(data, result);
            }
            List<BookingsForSpecificTrip> bookingsForSpecificTrips = JsonConvert.DeserializeObject<List<BookingsForSpecificTrip>>(result);
            return bookingsForSpecificTrips;
        }

        public object FailureCountInfoService(UIRequest uIRequest)
        {
            string result = null;
            string data = "AirFailureCount" + uIRequest.FromDate + uIRequest.ToDate;
            result = cache.Get(data);
            if (result == null)
            {                
                result = sqlDatabase.AirFailureCountDatabase(uIRequest);
                cache.Post(data, result);
            }
            FailureCount failureCount = JsonConvert.DeserializeObject<FailureCount>(result);
            return failureCount;
        }

        public object MarketingAirlineBookingsInfoService(UIRequest uIRequest)
        {
            string result = null;
            string data = "MarketingAirLine" + uIRequest.FromDate + uIRequest.ToDate;
            result = cache.Get(data);
            if (result == null)
            {                
                result = sqlDatabase.MarketingAirlineBookingsInfoDatabase(uIRequest);
                cache.Post(data, result);
            }
            List<MarketingAirlineBookings> marketingAirlineBookings = JsonConvert.DeserializeObject<List<MarketingAirlineBookings>>(result);
            return marketingAirlineBookings;
        }

        public object TotalBookingsInfoService()
        {
            string result = null;
            string data = "AirTotalBookingsCount";
            result = cache.Get(data);
            if (result == null)
            {                
                result = sqlDatabase.TotalBookingsInfoDatabase();
                cache.Post(data, result);
            }
            List<TotalBookings> totatlBookings = JsonConvert.DeserializeObject<List<TotalBookings>>(result);
            return totatlBookings;
        }
    }
}
