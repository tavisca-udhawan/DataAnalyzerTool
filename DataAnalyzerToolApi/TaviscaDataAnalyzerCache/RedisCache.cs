using StackExchange.Redis;
using System;

namespace TaviscaDataAnalyzerCache
{

    public class RedisCache : ICache
    {
        IDatabase redisDatabase;
        RedisConnector connector = new RedisConnector();

        public RedisCache()
        {
            redisDatabase = connector.Connection.GetDatabase();
        }

        public string Get(string key)
        {
            string value = redisDatabase.StringGet(key);
            if (string.IsNullOrEmpty(value))
                return null;
            else
                return value;
        }


        public void Post(string key, string value)
        {
            redisDatabase.StringSet(key, value, TimeSpan.FromMinutes(1));
        }


    }
}
