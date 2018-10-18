import { Component, OnInit } from '@angular/core';
import {Chart, ChartDataSets, ChartArea} from 'chart.js';
import 'hammerjs';
import 'chartjs-plugin-zoom';


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

  graphTypeValue: string
  title = 'graphs';
  labels = ["5 Star", "4 Star", "3 Star", "2 Star","1 Star"];
  dataPoints = [45,22,106,90,10];
  chart: string;
  locationGraph: any
  defaultGraphType: string
    ngOnInit(){
      this.locationGraph = null;
      this.defaultGraphType = "radar";
      this.DisplayGraph(this.defaultGraphType)
    }
    graphs: GraphTypes[] = [
      {value: 'bar', viewValue: 'Bar Graph'},
      {value: 'pie', viewValue: 'Pie Graph'},
      {value: 'line', viewValue: 'Line Graph'},
      {value: 'radar', viewValue: 'Radar Graph'},
      {value: 'doughnut', viewValue: 'Doughnut Graph'}
    ];

    constructor() { }
    GraphSelect(graphValue)
    {
      this.chart = graphValue;
     
  
        // this.chart = graphValue;
        // document.getElementById("lineChart").remove();
        // document.getElementById("chartContainer").innerHTML=('<canvas id="results-graph"></canvas>');
  
  
      // const context = canvas.getContext('2d');
      // context.clearRect(0, 0, canvas.width, canvas.height);
      // debugger;
    
      
      this.DisplayGraph(this.chart);
    }
      
  
      DisplayGraph(chart ) {
        
        //alert(graphType);
        if(this.locationGraph!=null)
        {this.locationGraph.destroy();}
         this.locationGraph = new Chart('location-chart', {
          type: chart,
          data: {
            labels: this.labels, // your labels array
            datasets: [
              { 
                label: 'Location Based Analaysis',
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
                alert(points[0]._index +" "+chart )
                
          },
            title: {
  
              text: "Location Based Analaysis",
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
   
  
  