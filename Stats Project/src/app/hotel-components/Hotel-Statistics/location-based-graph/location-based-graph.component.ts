import { Component, OnInit, Input } from '@angular/core';
import {Chart, ChartDataSets, ChartArea} from 'chart.js';
import 'hammerjs';
import 'chartjs-plugin-zoom';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';


export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'location-based-graph',
  templateUrl: './location-based-graph.component.html',
  styleUrls: ['./location-based-graph.component.css']
})
export class LocationBasedGraphComponent implements OnInit  {

  
  raphTypeValue: string
  title = 'Location Based Graph';
  chart: string = "line";
  hotelLocationGraph: any;
  defaultGraphType: string
  errorMsg: any
  locations: any=[];
  NumberOfBooking: any = [];
  @Input() location: string;
  @Input() startDate: string;
  @Input() endDate: string;
  paymentStartDate: string;
  paymentEndDate: string;
  paymentLocation: string;
  defaultStartDate: string = "2015-05-15"
  defaultEndDate: string = "2018-05-15"
  defaultLocation: string = "Las Vegas"
  //constructor( private http: HttpClient){}
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
      this.locations = []
      this.NumberOfBooking= []

      this.service.httpResponseFilters("Hotels","HotelLocations")
      .subscribe( data=>{
              
                          this.locations=data["City"];
                          for(let val in this.locations)
                          this.NumberOfBooking.push(5);
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
         this.hotelLocationGraph = new Chart('location-chart', {
          type: chart,
          data: {
            labels: this.locations,

            datasets: [
              {
                label: 'Bookings',
                data: this.NumberOfBooking, 
                borderColor: '#00AEFF',
                fill: true,
                lineTension: 0.2,
                borderWidth: 1
              }
            ]
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
                    display: false //this will remove only the labelss
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
   
  
  