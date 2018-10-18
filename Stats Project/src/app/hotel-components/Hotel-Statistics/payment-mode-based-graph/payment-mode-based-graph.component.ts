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

  raphTypeValue: string
  title = 'Modes of Payment';
  chart: string = "line";
  hotelLocationGraph: any;
  defaultGraphType: string
  errorMsg: any
  PaymentType: any=[];
  NumberOfBooking: any = [];
  @Input() location: string;
  @Input() startDate: Date;
  @Input() endDate: Date;
  //constructor( private http: HttpClient){}
  constructor (private service:GraphsServiceService) { }

    ngOnInit(){
      this.hotelLocationGraph = null;
      this.defaultGraphType = "line";
      this.PaymentType = []
      this.NumberOfBooking= []

      this.service.httpResponseFilters("Hotels","PaymentType?fromDate=2015-07-27 00:00:00.000&toDate=2015-08-27 00:00:00.000&location=Las Vegas")
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
   
  
  
