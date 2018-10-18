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
    }
}
