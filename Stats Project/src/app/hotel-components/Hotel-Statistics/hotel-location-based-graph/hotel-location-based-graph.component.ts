import { Component, OnInit, Input } from '@angular/core';
import {Chart, ChartDataSets, ChartArea} from 'chart.js';
import {  GraphsServiceService } from '../../../service/hotel-service/graphs-service.service';
declare var CanvasJS: any;
import 'hammerjs';


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
  chart: string = "line";
  hotelLocationGraph: any;
  defaultGraphType: string
  errorMsg: any
  Bookings: any=[];
  Hotels: any = [];
  @Input() location: string;
  @Input() startDate: string;
  @Input() endDate: string;
  paymentStartDate: string;
  paymentEndDate: string;
  paymentLocation: string;
  defaultStartDate: string = "2015-05-15"
  defaultEndDate: string = "2018-05-15"
  defaultLocation: string = "Las Vegas"
  graphDataPoints= [];
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
      this.Bookings = []
      this.Hotels = []

      this.service.httpResponseFilters("Hotels","HotelNamesWithDates?fromDate="+ this.paymentStartDate +" 00:00:00.000&toDate="+this.paymentEndDate+" 00:00:00.000&location="+this.paymentLocation)
      .subscribe( data=>{
              
                      for(var i=0;i<Object.keys(data).length;i++)
                        {
                          this.Bookings.push(data[i].bookings);
                          this.Hotels.push(data[i].hotelName);
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
      {value: 'area', viewValue: 'Area Graph'},
      {value: 'doughnut', viewValue: 'Doughnut Graph'}
    ];


    GraphSelect(graphValue)
    {
      this.chart = graphValue;
  

     this.DisplayGraph(this.chart);
    }


    setDataPoints(xAxis, yAxis)
    {
      for(var i = 0; i<xAxis.length;i++)
      {
        this.graphDataPoints.push({label: xAxis[i], y: yAxis[i]});
      }
      
    }
    DisplayGraph(chart ) {

      this.setDataPoints(this.Hotels,this.Bookings)

      var chart = new CanvasJS.Chart("hotel-location-chart", {
        zoomEnabled:true,
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", 
        title:{
          text: "Hotel Location Graph"
        },
        data: [{
          type: chart,
          indexLabelFontColor: "#5A5757",
          indexLabelPlacement: "outside",
          dataPoints: this.graphDataPoints,
          click: function (e) {
            alert(e.dataPoint.y +" "+e.dataPoint.label)
          }
        }]
      });
      chart.render();
    }
      showDetails(event)
      {
        alert("working");
      }


    }
