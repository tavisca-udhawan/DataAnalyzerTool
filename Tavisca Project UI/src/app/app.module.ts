import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule, MatTabsModule, MatIconModule} from '@angular/material';
import { WidgetComponent } from './hotel-components/widget/widget.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {MatAutocompleteModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatRippleModule,MatNativeDateModule,MatSelectModule} from "@angular/material";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { FlightWidgetComponent } from './flight-components/flight-widget/flight-widget.component';
import { HotelLocationBasedGraphComponent } from './hotel-components/Hotel-Statistics/hotel-location-based-graph/hotel-location-based-graph.component';
import { BookingWithDatesGraphComponent } from './hotel-components/Hotel-Statistics/booking-with-dates-graph/booking-with-dates-graph.component';
import { SupplierNameBasedGraphComponent } from './hotel-components/Hotel-Statistics/supplier-name-based-graph/supplier-name-based-graph.component';
import { BookingFaliureCountBasedGraphComponent } from './hotel-components/Hotel-Statistics/booking-faliure-count-based-graph/booking-faliure-count-based-graph.component';
import { PaymentModeBasedGraphComponent } from './hotel-components/Hotel-Statistics/payment-mode-based-graph/payment-mode-based-graph.component';
import { HotelLocationsPipe } from './pipes/hotel-pipes/hotel-locations.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  GraphsServiceService } from './service/hotel-service/graphs-service.service';
import { HttpClientModule } from '@angular/common/http';
import  'chartjs-plugin-zoom';
import 'hammerjs';
import { HotelNamesWithDatesGraphComponent } from './hotel-components/Hotel-Statistics/hotel-names-with-dates-graph/hotel-names-with-dates-graph.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { FailureComponent } from './Home/BookingStatus/failure/failure.component';
import { SuccessComponent } from './Home/BookingStatus/success/success.component';
import { CancelledComponent } from './Home/BookingStatus/cancelled/cancelled.component';
import { PastComponent } from './Home/BookingStatus/past/past.component';
import { GraphsComponentComponent } from './graphs-component/graphs-component.component';
import {MatCardModule} from '@angular/material/card';
import { HotelEmailComponentComponent } from './hotel-components/hotel-email-component/hotel-email-component.component'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WidgetComponent,
    HomeComponent,
    FlightWidgetComponent,
    HotelLocationBasedGraphComponent,
    BookingWithDatesGraphComponent,
    SupplierNameBasedGraphComponent,
    BookingFaliureCountBasedGraphComponent,
    PaymentModeBasedGraphComponent,
    HotelLocationsPipe,
    HotelNamesWithDatesGraphComponent,
    FailureComponent,
    SuccessComponent,
    CancelledComponent,
    PastComponent,
    GraphsComponentComponent,
    HotelEmailComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      radius: 130,
      outerStrokeWidth: 22,
      innerStrokeWidth: 12,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
     }),
    MatNativeDateModule,
    CommonModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    AppRoutingModule,
    MatIconModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  exports:[
    MatCheckboxModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [ GraphsServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
