using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaviscaDataAnalyzerDatabase.Models;
using TaviscaDataAnalyzerDatabase.Models.Flights;

namespace TaviscaDataAnalyzerDatabase
{
    public class AirSqlDatabase : IAirRepository
    {
        SqlConnector sqlConnector = new SqlConnector();

        public string AirFailureCountDatabase(UIRequest uIRequest)
        {
            var connector = sqlConnector.ConnectionEstablisher();
            FailureCount failure = new FailureCount();
            string query = $"SELECT COUNT(t3.BookingStatus) as FailureCount FROM AirSegments t1 JOIN TripProducts t2 ON t1.TripProductId = t2.Id JOIN PassengerSegments  t3 ON t2.Id = t3.TripProductId where t2.ModifiedDate between '{uIRequest.FromDate}' and '{uIRequest.ToDate}' and t3.BookingStatus ='Purchased' and t2.ProductType='Air' ;";
            SqlCommand command = new SqlCommand(query, connector)
            {
                CommandType = CommandType.Text
            };
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();
            connector.Open();
            dataAdapter.Fill(dataTable);
            connector.Close();
            foreach (DataRow dataRow in dataTable.Rows)
            {
               failure.failureCount= Convert.ToInt32(dataRow["FailureCount"]);
            }
            var json = JsonConvert.SerializeObject(failure);
            return json;

        }

        public string AirPaymentTypeDatabase(UIRequest uIRequest)
        {
            var connector = sqlConnector.ConnectionEstablisher();
            List<AirPaymentType> list = new List<AirPaymentType>();
            string query = $"SELECT t3.PaymentType,Count(t3.PaymentType) as Bookings   FROM TripProducts t1 JOIN TripFolders t2 ON t1.TripFolderId=t2.FolderId JOIN Payments t3 ON t2.FolderId=t3.TripFolderId JOIN AirSegments t5 ON t5.TripProductId = t1.Id Join PassengerSegments t7 ON t7.TripProductId=t1.Id where t7.BookingStatus='Purchased'and t1.ModifiedDate between  '{uIRequest.FromDate}' and '{uIRequest.ToDate}'  and t1.ProductType='Air' group by t3.PaymentType; ";
            SqlCommand command = new SqlCommand(query, connector)
            {
                CommandType = CommandType.Text
            };
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();
            connector.Open();
            dataAdapter.Fill(dataTable);
            connector.Close();
            foreach (DataRow dataRow in dataTable.Rows)
            {
                AirPaymentType paymentDetails = new AirPaymentType();
                paymentDetails.PaymentType = Convert.ToString(dataRow["PaymentType"]);
                paymentDetails.NumberOfBookings = Convert.ToInt32(dataRow["Bookings"]);
                list.Add(paymentDetails);
            }
            var json = JsonConvert.SerializeObject(list);
            return json;
        }

        public string MarketingAirlineBookingsInfoDatabase(UIRequest uIRequest)
        {
            var connector = sqlConnector.ConnectionEstablisher();
            List<MarketingAirlineBookings> list = new List<MarketingAirlineBookings>();
            string query = $"SELECT t4.FullName,t5.MarketingAirlineCode,Count(t5.MarketingAirlineCode) as Bookings   FROM TripProducts t1 JOIN TripFolders t2 ON t1.TripFolderId=t2.FolderId JOIN Payments t3 ON t2.FolderId=t3.TripFolderId JOIN AirSegments t5 ON t5.TripProductId = t1.Id Join Airlines t4 ON t4.AirlineCode=t5.MarketingAirlineCode Join PassengerSegments t7 ON t7.TripProductId=t1.Id where t7.BookingStatus='Purchased'and t1.ModifiedDate between  '{uIRequest.FromDate}' and '{uIRequest.ToDate}'  and t1.ProductType='Air' group by t5.MarketingAirlineCode,t4.FullName;  ";
            SqlCommand command = new SqlCommand(query, connector)
            {
                CommandType = CommandType.Text
            };
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();
            connector.Open();
            dataAdapter.Fill(dataTable);
            connector.Close();
            foreach (DataRow dataRow in dataTable.Rows)
            {
                MarketingAirlineBookings marketingAirline = new MarketingAirlineBookings();
                marketingAirline.AirlineName = Convert.ToString(dataRow["FullName"]);
                marketingAirline.AirLineCode= Convert.ToString(dataRow["MarketingAirlineCode"]);
                marketingAirline.NumberOfBookings = Convert.ToInt32(dataRow["Bookings"]);
                list.Add(marketingAirline);
            }
            var json = JsonConvert.SerializeObject(list);
            return json;
        }

        public string TotalBookingsInfoDatabase()
        {
            var connector = sqlConnector.ConnectionEstablisher();
            List<TotalBookings> list = new List<TotalBookings>();
            string query = $"SELECT t2.BookingStatus ,COUNT(t2.BookingStatus) As AllBookings FROM TripProducts t1 JOIN PassengerSegments t2 ON t1.Id=t2.TripProductId where t1.ProductType='Air' group by t2.BookingStatus;";
            SqlCommand command = new SqlCommand(query, connector)
            {
                CommandType = CommandType.Text
            };
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();
            connector.Open();
            dataAdapter.Fill(dataTable);
            connector.Close();
            foreach (DataRow dataRow in dataTable.Rows)
            {
                TotalBookings totalBookings = new TotalBookings();
                totalBookings.BookingStatus = Convert.ToString(dataRow["BookingStatus"]);
                totalBookings.NumberOfBookings = Convert.ToInt32(dataRow["AllBookings"]);
                list.Add(totalBookings);
            }
            var json = JsonConvert.SerializeObject(list);
            return json;
        }
    }
}
