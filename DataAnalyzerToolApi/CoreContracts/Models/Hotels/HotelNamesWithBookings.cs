﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoreContracts.Models.Hotels
{
    public class HotelNamesWithBookings
    {
        public string HotelName { get; set; }
        public int Bookings { get; set; }
    }
}