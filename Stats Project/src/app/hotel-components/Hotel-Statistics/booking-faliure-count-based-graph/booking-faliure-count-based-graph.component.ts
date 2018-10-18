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
  
  @Input() location: string;
  @Input() startDate: Date;
  @Input() endDate: Date;
  //constructor( private http: HttpClient){}
  constructor (private service:GraphsServiceService) { }

    ngOnInit(){
      this.hotelLocationGraph = null;
      this.defaultGraphType = "radar";
      this.Failures = []

      this.service.httpResponseFilters("Hotels","FailureCount?fromDate=2013-07-27 00:00:00.000&toDate=2017-08-02 00:00:00.000&location=New York")
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
   
  
  