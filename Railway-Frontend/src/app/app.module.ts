import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainDisplayComponent } from './component/main-display/main-display.component';
import { SearchRoutesComponent } from './shared/component/search-routes/search-routes.component';
import { SearchByStationComponent } from './shared/component/menu-elements/search-by-station/search-by-station.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchByTrainNumberComponent } from './shared/component/menu-elements/search-by-train-number/search-by-train-number.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/material/angular-material/angular-material.module';
import { LoginComponent } from './shared/component/login/login.component';
import { RegisterComponent } from './shared/component/register/register.component';
import { TrainScheduleComponent } from './shared/component/menu-elements/train-schedule/train-schedule.component';
import { DivertedTrainComponent } from './shared/component/menu-elements/diverted-train/diverted-train.component';
import { CancelledTrainComponent } from './shared/component/menu-elements/cancelled-train/cancelled-train.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './shared/component/menu/menu.component';
import { SeatAvailabilityComponent } from './shared/component/menu-elements/seat-availability/seat-availability.component';
import { CustomerServiceComponent } from './shared/component/menu-elements/customer-service/customer-service.component';
import { HelpDeskComponent } from './shared/component/menu-elements/help-desk/help-desk.component';
import { TrainArrivalPredictorComponent } from './shared/component/menu-elements/train-arrival-predictor/train-arrival-predictor.component';
import { LiveTrainStatusComponent } from './shared/component/menu-elements/live-train-status/live-train-status.component';
import { DasboardComponent } from './component/dasboard/dasboard.component';
import { UpcomingTripsComponent } from './component/upcoming-trips/upcoming-trips.component';
import { RecentSearchesComponent } from './component/recent-searches/recent-searches.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { BookingTrainsComponent } from './shared/component/booking-trains/booking-trains.component';
import { BookingComponent } from './component/booking/booking.component';
import { AuthGuard } from './auth.guard';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
 }

@NgModule({
  declarations: [
    AppComponent,
    MainDisplayComponent,
    SearchRoutesComponent,
    SearchByStationComponent,
    SearchByTrainNumberComponent,
    LoginComponent,
    RegisterComponent,
    TrainScheduleComponent,
    DivertedTrainComponent,
    CancelledTrainComponent,
    FooterComponent,
    MenuComponent,
    SeatAvailabilityComponent,
    CustomerServiceComponent,
    HelpDeskComponent,
    TrainArrivalPredictorComponent,
    LiveTrainStatusComponent,
    DasboardComponent,
    UpcomingTripsComponent,
    RecentSearchesComponent,
    EditProfileComponent,
    BookingTrainsComponent,
    BookingComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
