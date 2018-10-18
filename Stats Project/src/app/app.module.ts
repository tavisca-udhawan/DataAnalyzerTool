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
import { RatingBasedGraphComponent } from './hotel-components/Hotel-Statistics/rating-based-graph/rating-based-graph.component';
import { SupplierNameBasedGraphComponent } from './hotel-components/Hotel-Statistics/supplier-name-based-graph/supplier-name-based-graph.component';
import { BookingFaliureCountBasedGraphComponent } from './hotel-components/Hotel-Statistics/booking-faliure-count-based-graph/booking-faliure-count-based-graph.component';
import { PaymentModeBasedGraphComponent } from './hotel-components/Hotel-Statistics/payment-mode-based-graph/payment-mode-based-graph.component';
import { HotelLocationsPipe } from './pipes/hotel-pipes/hotel-locations.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import  'chartjs-plugin-zoom';
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
    RatingBasedGraphComponent,
    SupplierNameBasedGraphComponent,
    BookingFaliureCountBasedGraphComponent,
    PaymentModeBasedGraphComponent,
    HotelLocationsPipe
  ],
  imports: [
    BrowserModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
