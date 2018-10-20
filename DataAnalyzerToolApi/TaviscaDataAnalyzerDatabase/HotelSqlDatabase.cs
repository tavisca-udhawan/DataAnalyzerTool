﻿using Newtonsoft.Json;
using System;
using System.Data;
using System.Collections.Generic;
using System.Data.SqlClient;
using CoreContracts.Models;
using CoreContracts.Models.Hotels;

namespace TaviscaDataAnalyzerDatabase
{
    public class HotelSqlDatabase:IHotelRepository
    {
        SqlConnection connector;
        public HotelSqlDatabase()
        {
             connector = sqlConnector.ConnectionEstablisher();
        }
        SqlConnector sqlConnector = new SqlConnector();

        public DataTable QueryExecuter(string query)
        {
            SqlCommand command = new SqlCommand(query, connector)
            {
                CommandType = CommandType.Text
            };
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();
            connector.Open();
            dataAdapter.Fill(dataTable);
            connector.Close();
            return dataTable;
        }
        public string GetAllLocationsDatabase()
        {           
            Cities cities = new Cities();
            string query = $"SELECT DISTINCT(t3.City)FROM TripFolders t1 JOIN TripProducts t2 ON t1.FolderId = t2.TripFolderId JOIN HotelSegments t3 ON t2.Id = t3.TripProductId ;";
            DataTable dataTable = QueryExecuter(query);
            foreach (DataRow dataRow in dataTable.Rows)
            {
                cities.City.Add(Convert.ToString(dataRow["City"]));
            }
            var json = JsonConvert.SerializeObject(cities);
            return json;
        }

        public string HotelsAtALocationWithDatesDatabases(UIRequest queryFormat)
        {
         
            List<HotelsInALocationWithDates> list = new List<HotelsInALocationWithDates>();
            string query = $"SELECT (t3.City),(t3.HotelName),Count(t3.City) as Bookings FROM TripFolders t1 JOIN TripProducts t2 ON t1.FolderId = t2.TripFolderId JOIN HotelSegments t3 ON t2.Id = t3.TripProductId JOIN PassengerSegments t4 ON t4.TripProductId=t2.Id where t3.StayPeriodStart between '{queryFormat.FromDate}' and '{queryFormat.ToDate}' and t2.ProductType='Hotel'  and t4.BookingStatus='Purchased' group by t3.HotelName,t3.city,t3.StayPeriodStart;";
            DataTable dataTable = QueryExecuter(query);
            foreach (DataRow dataRow in dataTable.Rows)
            {
                HotelsInALocationWithDates locationWithDates = new HotelsInALocationWithDates();
                HotelsAtLocation hotelAndBookings = new HotelsAtLocation();
                string city = Convert.ToString(dataRow["City"]);
                hotelAndBookings.HotelName = Convert.ToString(dataRow["HotelName"]);
                hotelAndBookings.Bookings = Convert.ToInt32(dataRow["Bookings"]);
                if (list.Exists(existingAlready => existingAlready.Place == city))
                {
                    list[list.FindIndex(existingAlready => existingAlready.Place == city)].HotelsAtParticularLocation.Add(hotelAndBookings);
                    list[list.FindIndex(existingAlready => existingAlready.Place == city)].totalBookings += hotelAndBookings.Bookings;
                }
                else
                {
                    locationWithDates.HotelsAtParticularLocation.Add(hotelAndBookings);
                    locationWithDates.Place = city;
                    locationWithDates.totalBookings += hotelAndBookings.Bookings;
                    list.Add(locationWithDates);
                }
            }
            var json = JsonConvert.SerializeObject(list);
            return json;
        }
        public string HotelNameWithDatesDatabases(UIRequest queryFormat)
        {
            
            List<HotelNamesWithBookings> list = new List<HotelNamesWithBookings>();
            string query = $"SELECT (t3.HotelName),Count(t3.City) as Bookings FROM TripFolders t1 JOIN TripProducts t2 ON t1.FolderId = t2.TripFolderId JOIN HotelSegments t3 ON t2.Id = t3.TripProductId JOIN PassengerSegments t4 ON t4.TripProductId=t2.Id where t3.StayPeriodStart between '{queryFormat.FromDate}' and '{queryFormat.ToDate}'  and t3.City='{queryFormat.Filter}' and t4.BookingStatus='Purchased' and t2.ProductType='Hotel' group by t3.HotelName,t3.StayPeriodStart ;";
            DataTable dataTable = QueryExecuter(query);
            foreach (DataRow dataRow in dataTable.Rows)
            {
                HotelNamesWithBookings hotelNamesWithBookings = new HotelNamesWithBookings();
                hotelNamesWithBookings.HotelName = Convert.ToString(dataRow["HotelName"]);
                hotelNamesWithBookings.Bookings = Convert.ToInt32(dataRow["Bookings"]);
                list.Add(hotelNamesWithBookings);
            }
            var json = JsonConvert.SerializeObject(list);
            return json;
        }
        public string SupplierNamesWithDatesDatabase(UIRequest queryFormat)
        {          
            List<IndividualSupplierBookings> list = new List<IndividualSupplierBookings>();
            string query = $"SELECT (t3.SupplierFamily),Count(t3.City) as Bookings FROM TripFolders t1 JOIN TripProducts t2 ON t1.FolderId = t2.TripFolderId JOIN HotelSegments t3 ON t2.Id = t3.TripProductId JOIN PassengerSegments t4 ON t4.TripProductId=t2.Id where t3.StayPeriodStart between '{queryFormat.FromDate}' and '{queryFormat.ToDate}' and t3.City='{queryFormat.Filter}' and t4.BookingStatus='Purchased' and t2.ProductType='Hotel' group by t3.SupplierFamily,t3.city,t3.StayPeriodStart ;";
            DataTable dataTable = QueryExecuter(query);
            foreach (DataRow dataRow in dataTable.Rows)
            {
                string supplierFamilyname = Convert.ToString(dataRow["SupplierFamily"]);
                IndividualSupplierBookings supplierNamesWithBookings = new IndividualSupplierBookings();
                if (list.Exists(suppName => suppName.SupplierName == supplierFamilyname))
                {
                    list[list.FindIndex(suppName => suppName.SupplierName == supplierFamilyname)].Bookings += Convert.ToInt32(dataRow["Bookings"]);
                }
                else
                {
                    supplierNamesWithBookings.SupplierName = supplierFamilyname;
                    supplierNamesWithBookings.Bookings = Convert.ToInt32(dataRow["Bookings"]);
                    list.Add(supplierNamesWithBookings);
                }
            }
            var json = JsonConvert.SerializeObject(list);
            return json;
        }
        public string FailureCountDataBase(UIRequest queryFormat)
        {
            FailuresInBooking failuresInBooking = new FailuresInBooking();
            string query = $"SELECT COUNT(t3.BookingStatus) as Failure FROM HotelSegments t1 JOIN TripProducts t2 ON t1.TripProductId = t2.Id JOIN PassengerSegments  t3 ON t2.Id = t3.TripProductId where t2.ModifiedDate between '{queryFormat.FromDate}' and '{queryFormat.ToDate}' and t3.BookingStatus ='Planned' and t2.ProductType='Hotel' and t1.City='{queryFormat.Filter}';";
            DataTable dataTable = QueryExecuter(query);
            foreach (DataRow dataRow in dataTable.Rows)
            {
                failuresInBooking.counter = Convert.ToInt32(dataRow["Failure"]);

            }
            var json = JsonConvert.SerializeObject(failuresInBooking);
            return json;
        }

        public string PaymentDetailsDatabase(UIRequest queryFormat)
        {
            List<PaymentDetails> list = new List<PaymentDetails>();
            string query = $"SELECT t3.PaymentType,Count(t3.PaymentType) as Bookings   FROM TripProducts t1 JOIN TripFolders t2 ON t1.TripFolderId=t2.FolderId JOIN Payments t3 ON t2.FolderId=t3.TripFolderId JOIN PassengerSegments t4 ON t1.Id=t4.TripProductId JOIN HotelSegments t5 ON t5.TripProductId = t1.Id where t5.City='{queryFormat.Filter}' and t1.ModifiedDate between  '{queryFormat.FromDate}' and '{queryFormat.ToDate}' and t1.ProductType='Hotel' and t4.BookingStatus='Purchased' and t1.ProductType='Hotel' group by t3.PaymentType; ";
            DataTable dataTable = QueryExecuter(query);
            foreach (DataRow dataRow in dataTable.Rows)
            {
                PaymentDetails paymentDetails = new PaymentDetails();
                paymentDetails.PaymentType = Convert.ToString(dataRow["PaymentType"]);
                paymentDetails.NumberOfBooking = Convert.ToInt32(dataRow["Bookings"]);
                list.Add(paymentDetails);
            }
            var json = JsonConvert.SerializeObject(list);
            return json;
        }

        public string BookingDatesDatabase(UIRequest queryFormat)
        {
            List<HotelBookingDates> list = new List<HotelBookingDates>();
            string query = $"SELECT  t1.ModifiedDate ,COUNT(t1.ModifiedDate) AS Bookings FROM TripProducts t1 JOIN PassengerSegments t2 ON t1.Id=t2.TripProductId JOIN  HotelSegments t3 ON t3.TripProductId=t1.Id where t1.ProductType='Hotel' AND t2.BookingStatus='Purchased' AND  t3.City='{queryFormat.Filter}' AND t1.ModifiedDate between '{queryFormat.FromDate}' and '{queryFormat.ToDate}' group by t1.ModifiedDate;  ";
            DataTable dataTable = QueryExecuter(query);
            foreach (DataRow dataRow in dataTable.Rows)
            {

                HotelBookingDates hotelBookingDates = new HotelBookingDates();
                
                string bookingDate = Convert.ToString(dataRow["ModifiedDate"]);
                bookingDate = bookingDate.Substring(0, 9);
                if (list.Exists(existingAlready => existingAlready.BookingDates == bookingDate))
                {
                    
                    list[list.FindIndex(existingAlready => existingAlready.BookingDates == bookingDate)].NumberOfBookings += Convert.ToInt32(dataRow["Bookings"]);
                }
                else
                {
                    hotelBookingDates.BookingDates = bookingDate;
                    hotelBookingDates.NumberOfBookings = Convert.ToInt32(dataRow["Bookings"]);
                    list.Add(hotelBookingDates);
                }
            }
            var json = JsonConvert.SerializeObject(list);
            return json;
        }

        public string TotalHotelBookingsDataBase()
        {
            List<TotalHotelBookings> list = new List<TotalHotelBookings>();
            
            string query = $"SELECT t2.BookingStatus ,COUNT(t2.BookingStatus) As AllBookings FROM TripProducts t1 JOIN PassengerSegments t2 ON t1.Id=t2.TripProductId where t1.ProductType='Hotel' group by t2.BookingStatus;";
            DataTable dataTable = QueryExecuter(query);
            foreach (DataRow dataRow in dataTable.Rows)
            {
                TotalHotelBookings totalHotelBookings = new TotalHotelBookings();
                totalHotelBookings.Type= Convert.ToString(dataRow["BookingStatus"]);
                totalHotelBookings.Count= Convert.ToInt32(dataRow["AllBookings"]);
                list.Add(totalHotelBookings);
            }
            var json = JsonConvert.SerializeObject(list);
            return json;
        }
    }
}

