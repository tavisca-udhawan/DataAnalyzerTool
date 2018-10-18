import { Component, OnInit } from '@angular/core';
import {Chart, ChartDataSets, ChartArea} from 'chart.js';
import 'hammerjs';
import 'chartjs-plugin-zoom';


export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'supplier-name-based-graph',
  templateUrl: './supplier-name-based-graph.component.html',
  styleUrls: ['./supplier-name-based-graph.component.css']
})
export class SupplierNameBasedGraphComponent implements OnInit
{
  graphTypeValue: string
  title = 'graphs';
  labels = ["5 Star", "4 Star", "3 Star", "2 Star","1 Star"];
  dataPoints = [45,22,106,90,10];
  chart: string;
  supplierNameGraph: any
  defaultGraphType: string
    ngOnInit(){
      this.supplierNameGraph = null;
      this.defaultGraphType = "bar";
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
        if(this.supplierNameGraph!=null)
        {this.supplierNameGraph.destroy();}
         this.supplierNameGraph = new Chart('supplier-name-chart', {
          type: chart,
          data: {
            labels: this.labels, // your labels array
            datasets: [
              { 
                label: 'Mode of Payment Based Analaysis',
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
  
              text: "Supplier Analaysis",
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
   
  
  


