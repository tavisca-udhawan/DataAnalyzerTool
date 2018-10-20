using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaviscaDataAnalyzerDatabase
{
   public class SqlConnector
    {
        private SqlConnection connector;
        private readonly IConfiguration configuration;
        public SqlConnector(IConfiguration config)
        {
            configuration = config;
        }

        public SqlConnector()
        {

        }
        private SqlConnection Connection()
        {
            //string connectionString = configuration.GetConnectionString("SQlDatabase");
            string connectionString = "Data Source=54.86.216.216;Initial Catalog=qaTripDataWareHouse_Sync;User ID=readonlynewbies2018;Password=Tavisca@123;";
            connector = new SqlConnection(connectionString);
            return connector;
        }
        public SqlConnection ConnectionEstablisher()
        {
            return Connection();
        }
    }
}
