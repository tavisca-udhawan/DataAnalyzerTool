using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StackExchange.Redis;

namespace TaviscaDataAnalyzerCache
{
    public class RedisConnector
    {
        static RedisConnector()
        {
            RedisConnector.lazyConnection = new Lazy<ConnectionMultiplexer>(() =>
            {
                return ConnectionMultiplexer.Connect("13.232.45.55:6379");
            });
        }

        private static Lazy<ConnectionMultiplexer> lazyConnection;

        public ConnectionMultiplexer Connection
        {
            get
            {
                return lazyConnection.Value;
            }
        }
    }
}
