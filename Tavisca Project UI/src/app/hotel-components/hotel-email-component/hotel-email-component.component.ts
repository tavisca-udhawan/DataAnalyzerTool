import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GraphsServiceService } from '../../service/hotel-service/graphs-service.service';

@Component({
  selector: 'hotel-email-component',
  templateUrl: './hotel-email-component.component.html',
  styleUrls: ['./hotel-email-component.component.css']
})
export class HotelEmailComponentComponent implements OnInit {

  errorMsg:any;
  EmailId: string
  FilterName = []
  StartDate = []
  EndDate = []
  Location = []
  Labels = []
  Statistics = []
  EmailJson ={}
  constructor(private service: GraphsServiceService) { }

  ngOnInit() {
  }
  SendEmail(){
    console.log(this.service.statsReport)
    this.FilterName = []
    this.StartDate = []
    this.EndDate = []
    this.Location = []
    this.Labels = []
    this.Statistics = []
    this.EmailJson ={}
    debugger;
    for(var i = 0; i<this.service.statsReport.length ; i++)
    {
      this.FilterName.push(this.service.statsReport[i].filter)
      this.StartDate.push(this.service.statsReport[i].startDate)
      this.EndDate.push(this.service.statsReport[i].endDate)
      this.Location.push(this.service.statsReport[i].location)
      this.Labels.push(this.service.statsReport[i].labels)
      this.Statistics.push(this.service.statsReport[i].statistics)
    }
   this.EmailJson = {
      "RecipientEmialId":this.EmailId,
      "FilterName":this.FilterName,
      "StartDate":this.StartDate,
      "EndDate": this.EndDate,
      "Location": this.Location,
      "Labels":this.Labels,
      "Statistics": this.Statistics
    }
    debugger
    this.service.httpEmailSending(this.EmailJson)
    .subscribe(
      data=>{console.log(data);},
      error=>{this.errorMsg=error}
      );
  }

}
