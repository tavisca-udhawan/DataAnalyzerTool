import { Component, OnInit } from '@angular/core';
export interface Graph {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'flight-widget',
  templateUrl: './flight-widget.component.html',
  styleUrls: ['./flight-widget.component.css']
})
export class FlightWidgetComponent implements OnInit {
  minDate = new Date(2012, 0, 1);
  maxDate = new Date();
  graphs: Graph[] = [
    {value: 'place', viewValue: 'Origin and Destination Scenario'},
    {value: 'marketingAirline', viewValue: 'Marketing Airline'},
    {value: 'bookDate', viewValue: 'Booking Date'},
    {value: 'supplierName', viewValue: 'Supplier Name'},
    {value: 'failure', viewValue: 'Booking Failure Count'},
    {value: 'paymentMode', viewValue: 'Payment Mode'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
