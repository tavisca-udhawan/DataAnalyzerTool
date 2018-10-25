import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HotelLocationBasedGraphComponent } from '../../hotel-components/Hotel-Statistics/hotel-location-based-graph/hotel-location-based-graph.component';

@Injectable({
  providedIn: 'root'
})

export class GraphsServiceService {
  //hotelLocation = {};
  location:string = "Las Vegas";
  start:string = "2015-05-15";
  end:string = "2018-05-15";
  statsReport = []
  
  
  //statsReport = []
  //locationServiceResponse: any;
  constructor(private http: HttpClient) { }

  httpResponseFilters(productName, filterParameters): Observable<any> {
//this.http.get<any>('http://localhost:63564/api/Hotels/HotelNamesWithDates?fromDate=2015-07-27 00:00:00.000&toDate=2015-08-27 00:00:00.000&location=Las Vegas') .catch(this.errorHandler); 
console.log(this.statsReport)
  //debugger
   // console.log(this.locationServiceResponse + "fromServiceeeeeeeeeeeeeeeeeeeeeeeeeeee")
    return this.http.get<any>('http://localhost:53783/api/'+productName+'/'+filterParameters)
                     .catch(this.errorHandler);
  }

  httpEmailSending(EmailDetails):Observable<any>{
    return this.http.post('http://localhost:53783/api/EmailSender',EmailDetails)
                    .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }
}
