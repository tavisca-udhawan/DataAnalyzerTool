import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators,FormControl,FormBuilder } from '@angular/forms';
import {  GraphsServiceService } from '../../service/hotel-service/graphs-service.service';
import { stringify } from '@angular/core/src/util';
import { BookingWithDatesGraphComponent } from '../Hotel-Statistics/booking-with-dates-graph/booking-with-dates-graph.component';
import { HotelLocationBasedGraphComponent } from '../Hotel-Statistics/hotel-location-based-graph/hotel-location-based-graph.component';
import { HotelNamesWithDatesGraphComponent } from '../Hotel-Statistics/hotel-names-with-dates-graph/hotel-names-with-dates-graph.component';
import { LocationBasedGraphComponent } from '../Hotel-Statistics/location-based-graph/location-based-graph.component';
import { PaymentModeBasedGraphComponent } from '../Hotel-Statistics/payment-mode-based-graph/payment-mode-based-graph.component';
import { SupplierNameBasedGraphComponent } from '../Hotel-Statistics/supplier-name-based-graph/supplier-name-based-graph.component';
export interface Graph {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})

export class WidgetComponent implements OnInit {

  @ViewChild(BookingWithDatesGraphComponent) book: BookingWithDatesGraphComponent;
  @ViewChild(HotelLocationBasedGraphComponent) hotelLocation: HotelLocationBasedGraphComponent;
  @ViewChild(HotelNamesWithDatesGraphComponent) hotelNames: HotelNamesWithDatesGraphComponent;
  @ViewChild(LocationBasedGraphComponent) locationsGraph: LocationBasedGraphComponent;
  @ViewChild(PaymentModeBasedGraphComponent) payment: PaymentModeBasedGraphComponent;
  @ViewChild(SupplierNameBasedGraphComponent) supplierName: SupplierNameBasedGraphComponent;
  currentStartDate:Date;
  currentEndDate:Date=new Date();
  hotelEndDate:string;
  hotelStartDate: string;
  selectedValue:string;
  temp = "hello";
  minDate = new Date(2016, 0, 1);
  maxDate = new Date();
  startDate:Date=null;
  location:any;
  ids:any;
  IsVisible:boolean=true;
  searchTerm:any;
  checkValue:Array<string>=['location', 'name', 'bookDate', 'supplierName', 'failure', 'paymentMode'];
  paymentServiceResponse: any;

  graphs: Graph[] = [
    {value: 'location', viewValue: 'Hotel Location'},
   // {value: 'chain', viewValue: 'Hotel Chain'},
   // {value: 'rating', viewValue: 'Rating'},
    {value: 'name', viewValue: 'Hotel Name'},
 //  {value: 'date', viewValue: 'Check-in and Check-out Date'},
    {value: 'bookDate', viewValue: 'Booking Date'},
    {value: 'supplierName', viewValue: 'Supplier Name'},
    //{value: 'failure', viewValue: 'Booking Failure Count'},
    {value: 'paymentMode', viewValue: 'Payment Mode'}
  ];

    response:any;
    res:any [];
    errorMsg:any;
    inputForm:FormGroup;
    constructor(private fb:FormBuilder, private service:GraphsServiceService ){
      
      this.service.httpResponseFilters("Hotels","HotelLocations")
      .subscribe( data=>{ this.response = data;
                          this.res = data["city"]; },
                  error=>{ this.errorMsg = error;});

      //this.GetLocationData()
    }

  ngOnInit() {
    this.inputForm=this.fb.group({
      'startDateControl':[null,[Validators.required]],
      'endDateControl':[null,[Validators.required]],
      'location':[null,[Validators.required]]
    });
  
  }
  GetLocationData()
  {
    debugger
    this.service.httpResponseFilters("Hotels","HotelNamesWithDates?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000&location="+this.service.location)
    .subscribe(data => {
     // this.service.locationServiceResponse = null;
    //  this.service.locationServiceResponse = data;
      //this.locationsGraph.value 
      //this.hotelLocation.RenderGraph()
      debugger
    })
  }
  checkStartDate(){
    this.IsVisible=false;
  }
   ServiceCalls()
  {
    if(this.checkValue.includes('location'))
    { this.hotelLocation.reRender();}
    if(this.checkValue.includes ('name'))
    {this.hotelNames.reRender();}
    if(this.checkValue.includes('bookDate'))
    { this.book.reRender();}
    if(this.checkValue.includes('supplierName'))
    {  this.supplierName.reRender();}
    if(this.checkValue.includes('paymentMode'))
    {this.payment.reRender();}
  }


  dataAnalysis(startDate, endDate,checkVal){
    
    this._markAsDirty(this.inputForm);
    this.hotelEndDate = endDate.toString();
    this.checkValue=checkVal;
    this.hotelStartDate = startDate.toString();
    this.hotelEndDate = this.dateFormatter(this.hotelEndDate)
    this.hotelStartDate = this.dateFormatter(this.hotelStartDate)

    this.service.start=this.hotelStartDate;
    this.service.end=this.hotelEndDate;
    this.service.location=this.searchTerm;

   
    //debugger
     this.ServiceCalls()
     //this.GetLocationData();
    
  }
  dateFormatter(yourDate)
  {
     var currentDate = yourDate.toString()
     var dd: string = "";
     var mm: string = "";
     var yyyy: string = "";
     var formattedDate: string;
     var flag: number= 0;

     for(var i = 0; i< currentDate.length; i++)
     {
        if(currentDate[i]=="/")
        {
          flag = flag +1;
        }
       else if(flag ==0)
        {
          mm = mm + currentDate[i];
        }
        else if(flag ==1)
        {
          dd = dd + currentDate[i];
        }
        else if(flag ==2)
        {
          yyyy = yyyy + currentDate[i];
        }
      } 
        formattedDate = yyyy+"-"+mm+"-"+dd;
        return formattedDate ;    
     }
  private _markAsDirty(group:FormGroup){
    group.markAsDirty();
    for(let i in group.controls){
      group.controls[i].markAsDirty();
    }
  }
}
