import { Component, OnInit, Input } from '@angular/core';
import {Chart, ChartDataSets, ChartArea} from 'chart.js';
import 'hammerjs';
import 'chartjs-plugin-zoom';
import { debug } from 'util';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';


export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'booking-faliure-count-based-graph',
  templateUrl: './booking-faliure-count-based-graph.component.html',
  styleUrls: ['./booking-faliure-count-based-graph.component.css']
})
export class BookingFaliureCountBasedGraphComponent implements OnInit {
 
  graphTypeValue: string
  title = 'Booking failure Analysis';
  chart: string = "bar";
  hotelLocationGraph: any;
  defaultGraphType: string
  errorMsg: any
  Failures: any = [];
  loaderDisplay: Boolean
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
      this.defaultGraphType = "radar";
      this.Failures = []

      this.service.httpResponseFilters("Hotels","FailureCount?fromDate="+ this.paymentStartDate +" 00:00:00.000&toDate="+this.paymentEndDate+" 00:00:00.000&location="+this.paymentLocation)
      .subscribe( data=>{
              
                      console.log(data.counter)
                    
                          this.Failures.push(data.counter);
                    
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
         this.hotelLocationGraph = new Chart('booking-faliure-chart', {
          type: chart,
          data: {
            labels:this.Failures,

            datasets: [
              {
                label: 'Failures',
                data: this.Failures, 
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
              fontFamily:  "sans-serif",
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
   
  
  