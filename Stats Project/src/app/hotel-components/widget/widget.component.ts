import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators,FormControl,FormBuilder } from '@angular/forms';
import {  GraphsServiceService } from '../../service/hotel-service/graphs-service.service';
import { stringify } from '@angular/core/src/util';

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
  IsVisible:boolean=true;
  checkValue:Array<string>=['location', 'name', 'bookDate', 'supplierName', 'failure', 'paymentMode'];
  graphs: Graph[] = [
    {value: 'location', viewValue: 'Hotel Location'},
   // {value: 'chain', viewValue: 'Hotel Chain'},
   // {value: 'rating', viewValue: 'Rating'},
    {value: 'name', viewValue: 'Hotel Name'},
 //  {value: 'date', viewValue: 'Check-in and Check-out Date'},
    {value: 'bookDate', viewValue: 'Booking Date'},
    {value: 'supplierName', viewValue: 'Supplier Name'},
    {value: 'failure', viewValue: 'Booking Failure Count'},
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
                
    }

  ngOnInit() {
    this.inputForm=this.fb.group({
      'startDateControl':[null,[Validators.required]],
      'endDateControl':[null,[Validators.required]],
      'location':[null,[Validators.required]]
    });
  }
  GetHotelData()
  {

  }
  checkStartDate(){
    this.IsVisible=false;
  }
  dataAnalysis(startDate, endDate,checkVal){
    this._markAsDirty(this.inputForm);
    this.hotelEndDate = endDate.toString();
   if(checkVal!=null)
    {this.checkValue=checkVal;}
    this.hotelStartDate = startDate.toString();
    this.hotelEndDate = this.dateFormatter(this.hotelEndDate)
    this.hotelStartDate = this.dateFormatter(this.hotelStartDate)

    
    //  var container = document.getElementById("graphs");
    //  var content = container.innerHTML;
    //  container.innerHTML= content; 
    
   //this line is to watch the result in console , you can remove it later	
    console.log("Refreshed"); 
 
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
