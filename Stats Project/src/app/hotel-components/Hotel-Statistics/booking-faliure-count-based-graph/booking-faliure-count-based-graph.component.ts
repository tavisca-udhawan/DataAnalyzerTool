import { Component, OnInit, Input } from '@angular/core';
import {Chart, ChartDataSets, ChartArea} from 'chart.js';
import 'hammerjs';
import 'chartjs-plugin-zoom';
import { debug } from 'util';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


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
  @Input() childMessage: string;
  graphTypeValue: string
  title = 'graphs';
  labels = ["5 Star", "4 Star", "3 Star", "2 Star","1 Star"];
  dataPoints = [45,22,106,90,10];
  chart: string;
  date: string;
  bookingFailureGraph: any
  defaultGraphType: string
    ngOnInit(){
      this.bookingFailureGraph = null;
      this.defaultGraphType = "pie";
      this.date = this.childMessage;
      //debugger;
      this.DisplayGraph(this.defaultGraphType,this.date)
      
    }
    graphs: GraphTypes[] = [
      {value: 'bar', viewValue: 'Bar Graph'},
      {value: 'pie', viewValue: 'Pie Graph'},
      {value: 'line', viewValue: 'Line Graph'},
      {value: 'radar', viewValue: 'Radar Graph'},
      {value: 'doughnut', viewValue: 'Doughnut Graph'}
    ];

    constructor() {
 
     }
    GraphSelect(graphValue)
    {
      this.chart = graphValue;
      this.DisplayGraph(this.chart,this.date);
    }
      
  
      DisplayGraph(chart,date) {
        //debugger;
  
        if(this.bookingFailureGraph!=null)
        {this.bookingFailureGraph.destroy();}
         this.bookingFailureGraph = new Chart('booking-faliure-chart', {
          type: chart,
          data: {
            labels: this.labels, // your labels array
            datasets: [
              { 
                label: 'Rating Analaysis',
                data: this.dataPoints, // your data array
                borderColor: '#00AEFF',
                fill: false,
                lineTension: 0.2,
                borderWidth: 1
              } 
            ]
          },
  
          options: {
            onClick(this: ChartDataSets, ev: MouseEvent, points: any) {
                alert(points[0]._index +" "+chart+" "+date)
          },
            title: {
  
              text: "Booking Failure Count Analaysis",
              display: true
            },
            
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }

          }      
        });
      }
      showDetails(event)
      {
        
        alert("working");
      }
      
   
    }
   
  
  