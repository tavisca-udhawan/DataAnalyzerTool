import { Component, OnInit, Input } from '@angular/core';
import {Chart, ChartDataSets, ChartArea} from 'chart.js';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';
declare var CanvasJS: any;

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
  GraphTypeValue: string
  chart: string = "line";
  hotelLocationGraph: any;
  defaultGraphType: string
  errorMsg: any
  SupplierName: any=[];
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
  graphDataPoints=[]
  id:string="supplier-name-chart";
  constructor (private service:GraphsServiceService) { }
 
  ngOnInit(){
    this.reRender()
  }
  reRender(){
    this.SupplierName = [];
    this.NumberOfBooking= [];
    this.service.httpResponseFilters("Hotels","SupplierNamesWithDates?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000&location="+this.service.location)
    .subscribe( data=>{
              for(var i=0;i<Object.keys(data).length;i++)
                      {
                        this.SupplierName.push(data[i].supplierName);
                        this.NumberOfBooking.push(data[i].bookings);
                      }
                      this.service.statsReport.push(
                        {
                          filter: "Suppliers Analysis",
                          startDate: this.service.start,
                          endDate: this.service.end,
                          location: this.service.location,
                          labels: this.SupplierName,
                          statistics: this.NumberOfBooking
                        })
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
      this.graphDataPoints = [];
      for(var i = 0; i<xAxis.length;i++)
      {
        this.graphDataPoints.push({label: xAxis[i], y: yAxis[i]});
      }
      
    }
    DisplayGraph(chart ) {

      this.setDataPoints(this.SupplierName,this.NumberOfBooking);

      var chart = new CanvasJS.Chart(this.id, {
        zoomEnabled:true,
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", 
        title:{
          text: "Supplier Name Graph"
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
   
  
  


