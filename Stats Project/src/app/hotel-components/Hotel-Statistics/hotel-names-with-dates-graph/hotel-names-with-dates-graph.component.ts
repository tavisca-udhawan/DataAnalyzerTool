import { Component, OnInit, Input } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';
import { ChartDataSets } from 'chart.js';
import * as Chart from 'chart.js';
export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-hotel-names-with-dates-graph',
  templateUrl: './hotel-names-with-dates-graph.component.html',
  styleUrls: ['./hotel-names-with-dates-graph.component.css']
})
export class HotelNamesWithDatesGraphComponent implements OnInit {

  GraphTypeValue: string
  title = 'Hotels with Dates Graph';
  chart: string = "line";
  hotelLocationGraph: any;
  defaultGraphType: string
  errorMsg: any
  HotelsAtParticularLocation: any=[];
  totalBookings: any = [];
  Place: any = [];
  @Input() location: string;
  @Input() startDate: string;
  @Input() endDate: string;
  paymentStartDate: string;
  paymentEndDate: string;
  paymentLocation: string;
  defaultStartDate: string = "2015-05-15"
  defaultEndDate: string = "2018-05-15"
  defaultLocation: string = "Las Vegas"
  constructor (private service:GraphsServiceService) { }
  setDatesAndLocation()
  {
    if(this.startDate == null)
    {
      this.paymentStartDate = this.defaultStartDate
    }
    else 
    {
      this.paymentStartDate = this.startDate
    }
    if(this.endDate == null)
    {
      this.paymentEndDate = this.defaultEndDate
    }
    else 
    {
      this.paymentEndDate = this.endDate
    }
    if(this.location == null)
    {
      this.paymentLocation = this.defaultLocation
    }
    else 
    {
      this.paymentLocation = this.location
    }
  }
  ngOnInit(){
      this.setDatesAndLocation()
         this.hotelLocationGraph = null;
      this.defaultGraphType = "line";
      this.HotelsAtParticularLocation = []
      this.totalBookings= []
      this.Place= []
      this.service.httpResponseFilters("Hotels","HotelLocationWithDates?fromDate="+ this.paymentStartDate +" 00:00:00.000&toDate="+this.paymentEndDate+" 00:00:00.000")
      .subscribe( data=>{
              
                      for(var i=0;i<Object.keys(data).length;i++)
                        {
                          console.log(data[i].HotelsAtParticularLocation[0]["HotelName"]);
                          console.log(data[i].HotelsAtParticularLocation[0]["Bookings"]);
                          this.HotelsAtParticularLocation.push(data[i].HotelsAtParticularLocation[0]["HotelName"]+"-"+data[i].HotelsAtParticularLocation[0]["Bookings"]);
                          this.totalBookings.push(data[i].totalBookings);
                          this.Place.push(data[i].Place);
                        //  console.log(this.Bookings);
                        }
                        //debugger;
                        this.DisplayGraph( this.chart);
                  },
          error=>{ this.errorMsg = error;}

            );

    }
    graphs: GraphTypes[] = [
      {value: 'bar', viewValue: 'Bar Graph'},
      {value: 'pie', viewValue: 'Pie Graph'},
      {value: 'line', viewValue: 'Line Graph'},
      {value: 'radar', viewValue: 'Radar Graph'},
      {value: 'doughnut', viewValue: 'Doughnut Graph'}
    ];


    GraphSelect(graphValue)
    {
      this.chart = graphValue;
  

     this.DisplayGraph(this.chart);
    }


      DisplayGraph(chart ) {

        if(this.hotelLocationGraph!=null)
        {this.hotelLocationGraph.destroy();}
         this.hotelLocationGraph = new Chart('hotel-with-dates-chart', {
          type: chart,
          data: {
            labels: this.HotelsAtParticularLocation,

            datasets: [
              {
                label: 'Bookings',
                data: this.totalBookings, 
                borderColor: '#00AEFF',
                fill: true,
                lineTension: 0.2,
                borderWidth: 1
              },
              {
                label: 'Location',
                data: this.Place, 
                borderColor: '#00AEFF',
                fill: true,
                lineTension: 0.2,
                borderWidth: 1
              }
            ],
          },

          options: {

            onClick(this: ChartDataSets, ev: MouseEvent, points: any) {
                alert(points[0]._index +" "+chart )

          },
          legend:{
            display: false
          },
            title: {

              text: this.title,
              display: true
            },

            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                },
              ],
              xAxes: [{
                ticks: {
                    display: false //this will remove only the label
                }
            }]
            }
          }
        });
      }
      showDetails(event)
      {
        alert("working");
      }
      
   
}
