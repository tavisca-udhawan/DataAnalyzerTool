import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators,FormControl,FormBuilder } from '@angular/forms';
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
  hotelEndDate:Date;
  hotelStartDate: Date; 
  selectedValue:string;
  temp = "hello";
  minDate = new Date(2016, 0, 1);
  maxDate = new Date();
  startDate:Date=null;
  IsVisible:boolean=true;
  graphs: Graph[] = [
    {value: 'location', viewValue: 'Hotel Location'},
    {value: 'chain', viewValue: 'Hotel Chain'},
    {value: 'rating', viewValue: 'Rating'},
    {value: 'name', viewValue: 'Hotel Name'},
    {value: 'date', viewValue: 'Check-in and Check-out Date'},
    {value: 'bookDate', viewValue: 'Booking Date'},
    {value: 'supplierName', viewValue: 'Supplier Name'},
    {value: 'failure', viewValue: 'Booking Failure Count'},
    {value: 'paymentMode', viewValue: 'Payment Mode'}
  ];

    response:any;
    res:any [];
    inputForm:FormGroup;
    constructor(private fb:FormBuilder){} //(private httpService: HttpClient) {
    //    let observable = this.httpService.get("http://localhost:59962/api/HotelLocations");
  
    //   observable.subscribe((response)=>{
    //     this.response=response;
    //    this.res=response["City"];
    //   })
    //  }

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
  dataAnalysis(startDate, endDate){
    this._markAsDirty(this.inputForm);
    this.hotelEndDate = endDate;
    this.hotelStartDate = startDate;
    this.GetHotelData() 
  }
  private _markAsDirty(group:FormGroup){
    group.markAsDirty();
    for(let i in group.controls){
      group.controls[i].markAsDirty();
    }
  }
}
