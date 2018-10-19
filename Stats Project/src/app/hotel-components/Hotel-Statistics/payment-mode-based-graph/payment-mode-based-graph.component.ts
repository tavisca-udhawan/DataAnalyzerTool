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
  selector: 'payment-mode-based-graph',
  templateUrl: './payment-mode-based-graph.component.html',
  styleUrls: ['./payment-mode-based-graph.component.css']
})
export class PaymentModeBasedGraphComponent implements OnInit {

  GraphTypeValue: string
  title = 'Modes of Payment';
  chart: string = "line";
  hotelLocationGraph: any;
  defaultGraphType: string
  errorMsg: any
  PaymentType: any=[];
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
  constructor (private service:GraphsServiceService) { }

  getRandomColorHex() {
    var hex = "0123456789ABCDEF",
        color = "#";
    for (var i = 1; i <= 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
  }

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
      console.log(this.startDate + " "+ this.endDate + " "+ this.location)
      this.hotelLocationGraph = null;
      this.defaultGraphType = "line";
      this.PaymentType = []
      this.NumberOfBooking= []
         this.service.httpResponseFilters("Hotels","PaymentType?fromDate="+ this.paymentStartDate +" 00:00:00.000&toDate="+this.paymentEndDate+" 00:00:00.000&location="+this.paymentLocation)
      .subscribe( data=>{
             
                      for(var i=0;i<Object.keys(data).length;i++)
                        {
                          this.PaymentType.push(data[i].PaymentType);
                          this.NumberOfBooking.push(data[i].NumberOfBooking);
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
         this.hotelLocationGraph = new Chart('payment-mode-chart', {
          type: chart,
          data: {
            labels: this.PaymentType,

            datasets: [
              {
                label: 'Bookings',
                backgroundColor: [ this.getRandomColorHex(),
                  this.getRandomColorHex(),
                  this.getRandomColorHex(),
                  this.getRandomColorHex(),
                  this.getRandomColorHex()],
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
   
  
  
