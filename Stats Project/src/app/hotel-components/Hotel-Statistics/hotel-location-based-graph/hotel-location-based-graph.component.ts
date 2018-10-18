import { Component, OnInit, Input } from '@angular/core';
import {Chart, ChartDataSets, ChartArea} from 'chart.js';
import {  GraphsServiceService } from '../../../service/hotel-service/graphs-service.service';

import 'hammerjs';
import 'chartjs-plugin-zoom';
import { HttpClient } from '@angular/common/http';
import { getViewData } from '@angular/core/src/render3/instructions';
import { forEach } from '@angular/router/src/utils/collection';
import { trigger } from '@angular/animations';


export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'hotel-location-based-graph',
  templateUrl: './hotel-location-based-graph.component.html',
  styleUrls: ['./hotel-location-based-graph.component.css']
})
export class HotelLocationBasedGraphComponent implements OnInit  {

  graphTypeValue: string
  title = 'Hotels in location analysis';
  chart: string = "line";
  hotelLocationGraph: any;
  defaultGraphType: string
  errorMsg: any
  Bookings: any=[];
  Hotels: any = [];
  @Input() location: string;
  @Input() startDate: Date;
  @Input() endDate: Date;
  //constructor( private http: HttpClient){}
  constructor (private service:GraphsServiceService) { }

    ngOnInit(){
      this.hotelLocationGraph = null;
      this.defaultGraphType = "radar";
      this.Bookings = []
      this.Hotels = []

      this.service.httpResponseFilters("Hotels","HotelNamesWithDates?fromDate=2015-07-27 00:00:00.000&toDate=2015-08-27 00:00:00.000&location=Las Vegas")
      .subscribe( data=>{
              
                      for(var i=0;i<Object.keys(data).length;i++)
                        {
                          this.Bookings.push(data[i].Bookings);
                          this.Hotels.push(data[i].HotelName);
                        //  console.log(this.Bookings);
                        }
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
         this.hotelLocationGraph = new Chart('hotel-location-chart', {
          type: chart,
          data: {
            labels: this.Hotels,

            datasets: [
              {
                label: 'Bookings',
                data: this.Bookings, 
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
