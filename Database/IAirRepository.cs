using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaviscaDataAnalyzerDatabase.Models;

namespace TaviscaDataAnalyzerDatabase
{
   public interface IAirRepository
    {
        string AirPaymentTypeDatabase(UIRequest uIRequest);
    }
}
