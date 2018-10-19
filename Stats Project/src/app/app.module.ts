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
import { LocationBasedGraphComponent } from './hotel-components/Hotel-Statistics/location-based-graph/location-based-graph.component';
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
import { DemoComponent } from './demo/demo.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WidgetComponent,
    HomeComponent,
    FlightWidgetComponent,
    LocationBasedGraphComponent,
    HotelLocationBasedGraphComponent,
    BookingWithDatesGraphComponent,
    SupplierNameBasedGraphComponent,
    BookingFaliureCountBasedGraphComponent,
    PaymentModeBasedGraphComponent,
    HotelLocationsPipe,
    HotelNamesWithDatesGraphComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatNativeDateModule,
    CommonModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonModule,
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
