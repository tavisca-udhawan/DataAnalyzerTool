import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class GraphsServiceService {

  constructor(private http: HttpClient) { }

  httpResponseFilters(productName, filterParameters): Observable<any> {
//this.http.get<any>('http://localhost:63564/api/Hotels/HotelNamesWithDates?fromDate=2015-07-27 00:00:00.000&toDate=2015-08-27 00:00:00.000&location=Las Vegas') .catch(this.errorHandler); 

    return this.http.get<any>('http://localhost:53783/api/'+productName+'/'+filterParameters)
                     .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }
}
