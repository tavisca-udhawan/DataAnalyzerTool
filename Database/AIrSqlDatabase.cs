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
    }
}
