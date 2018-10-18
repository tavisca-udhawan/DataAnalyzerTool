using TaviscaDataAnalyzerDatabase.Models.Hotels;
using TaviscaDataAnalyzerDatabase.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Caching;
using System.Web.Http;
using TaviscaDataAnalyzerServiceProvider;

namespace TaviscaDataAnalyzerApi.Controllers
{
    public class HotelsController : ApiController
    {

        [HttpGet]
        [Route("api/HotelLocations")]
        public object GetAllLocations()
        {
            IHotelWebApiServiceProvider service = new HotelWebApiServiceProvider();
            Cities ListOfCities = JsonConvert.DeserializeObject<Cities>(service.GetAllLocationsService()); ;
            return ListOfCities;
        }

        [HttpGet]
        [Route("api/Hotels/HotelLocationWithDates")]
        public object GetHotelLocationWithDates([FromUri] string fromDate, string toDate)
        {
            UIRequest query = new UIRequest { ToDate = toDate, FromDate = fromDate };
            IHotelWebApiServiceProvider service = new HotelWebApiServiceProvider();
            List<HotelsInALocationWithDates> ListOfHotelsWithDates = JsonConvert.DeserializeObject<List<HotelsInALocationWithDates>>(service.HotelsAtALocationWithDatesService(query));
            return ListOfHotelsWithDates;
        }

        [HttpGet]
        [Route("api/Hotels/HotelNamesWithDates")]
        public object GetHotelNamesWithDates([FromUri] string fromDate, string toDate, string location)
        {
            UIRequest query = new UIRequest { ToDate = toDate, FromDate = fromDate, Filter = location };
            IHotelWebApiServiceProvider service = new HotelWebApiServiceProvider();
            List<HotelNamesWithBookings> ListOfHotelNamesWithDates = JsonConvert.DeserializeObject<List<HotelNamesWithBookings>>(service.HotelNameWithDatesService(query));
            return ListOfHotelNamesWithDates;
        }

        [HttpGet]
        [Route("api/Hotels/SupplierNamesWithDates")]
        public object GetSupplierNamesWithDates([FromUri] string fromDate, string toDate, string location)
        {
            UIRequest query = new UIRequest { ToDate = toDate, FromDate = fromDate, Filter = location };
            IHotelWebApiServiceProvider service = new HotelWebApiServiceProvider();
            List<IndividualSupplierBookings> ListOfSuppliers = JsonConvert.DeserializeObject<List<IndividualSupplierBookings>>(service.SupplierNamesWithDatesService(query));
            return ListOfSuppliers;
        }

        [HttpGet]
        [Route("api/Hotels/FailureCount")]
        public object GetFailureCount([FromUri] string fromDate, string toDate, string location)
        {
            UIRequest query = new UIRequest { ToDate = toDate, FromDate = fromDate, Filter = location };
            IHotelWebApiServiceProvider service = new HotelWebApiServiceProvider();
            FailuresInBooking FailureCount = JsonConvert.DeserializeObject<FailuresInBooking>(service.FailureCountService(query));
            return FailureCount;
        }

        [HttpGet]
        [Route("api/Hotels/PaymentType")]
        public object GetPaymentType([FromUri] string fromDate, string toDate, string location)
        {
            UIRequest query = new UIRequest { ToDate = toDate, FromDate = fromDate, Filter = location };
            IHotelWebApiServiceProvider service = new HotelWebApiServiceProvider();
            List<PaymentDetails> payment = JsonConvert.DeserializeObject<List<PaymentDetails>>(service.PaymentDetailsService(query));
            return payment;
        }

        [HttpGet]
        [Route("api/Hotels/BookingDates")]
        public object GetBookingDates([FromUri] string fromDate, string toDate, string location)
        {
            UIRequest query = new UIRequest { ToDate = toDate, FromDate = fromDate, Filter = location };
            IHotelWebApiServiceProvider service = new HotelWebApiServiceProvider();
            List<HotelBookingDates> hotelBookingDates = JsonConvert.DeserializeObject<List<HotelBookingDates>>(service.BookingDatesService(query));
            return hotelBookingDates;
        }

        [HttpGet]
        [Route("api/Hotels/TotalBookings")]
        public object GetSuccessfulCount()
        {

            IHotelWebApiServiceProvider service = new HotelWebApiServiceProvider();
            List<TotalHotelBookings> totalHotelBookings = JsonConvert.DeserializeObject<List<TotalHotelBookings>>(service.TotalHotelBookingsService());
            return totalHotelBookings;
        }

    }
}
