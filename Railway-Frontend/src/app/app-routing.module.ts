import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchByTrainNumberComponent } from './shared/component/menu-elements/search-by-train-number/search-by-train-number.component';
import { SearchByStationComponent } from './shared/component/menu-elements/search-by-station/search-by-station.component';
import { TrainScheduleComponent } from './shared/component/menu-elements/train-schedule/train-schedule.component';
import { CancelledTrainComponent } from './shared/component/menu-elements/cancelled-train/cancelled-train.component';
import { DivertedTrainComponent } from './shared/component/menu-elements/diverted-train/diverted-train.component';
import { SeatAvailabilityComponent } from './shared/component/menu-elements/seat-availability/seat-availability.component';
import { DasboardComponent } from './component/dasboard/dasboard.component';
import { TrainArrivalPredictorComponent } from './shared/component/menu-elements/train-arrival-predictor/train-arrival-predictor.component';
import { AuthGuard } from './auth.guard';
import { CustomerServiceComponent } from './shared/component/menu-elements/customer-service/customer-service.component';
import { LiveTrainStatusComponent } from './shared/component/menu-elements/live-train-status/live-train-status.component';
import { HelpDeskComponent } from './shared/component/menu-elements/help-desk/help-desk.component';
import { BookingTrainsComponent } from './shared/component/booking-trains/booking-trains.component';
import { BookingComponent } from './component/booking/booking.component';

const routes: Routes = [
  { path: 'dashboard/searchByTrainNumber', component: SearchByTrainNumberComponent },
  { path: 'searchByTrainNumber', component: SearchByTrainNumberComponent },
  { path: 'searchByStation', component:SearchByStationComponent},
  { path: 'dashboard/searchByStation', component:SearchByStationComponent},
  { path: 'trainSchedule', component:TrainScheduleComponent},
  { path: 'dashboard/trainSchedule', component:TrainScheduleComponent},
  { path: 'cancelledTrain', component:CancelledTrainComponent},
  { path: 'dashboard/cancelledTrain', component:CancelledTrainComponent},
  { path: 'divertedTrain', component:DivertedTrainComponent},
  { path: 'dashboard/divertedTrain', component:DivertedTrainComponent},
  { path: 'availableSeats', component:SeatAvailabilityComponent},
  { path: 'dashboard/availableSeats', component:SeatAvailabilityComponent},
  { path: 'dashboard', component:DasboardComponent, canActivate: [AuthGuard]},
  { path: 'arrivalTime', component:TrainArrivalPredictorComponent},
  { path: 'dashboard/arrivalTime', component:TrainArrivalPredictorComponent},
  { path: 'customerService', component:CustomerServiceComponent},
  { path: 'dashboard/customerService', component:CustomerServiceComponent},
  { path: 'liveStatus', component:LiveTrainStatusComponent},
  { path: 'dashboard/liveStatus', component:LiveTrainStatusComponent},
  { path: 'helpDesk', component:HelpDeskComponent},
  { path: 'dashboard/helpDesk', component:HelpDeskComponent},
  { path: 'bookingTrains', component:BookingTrainsComponent},
  { path: 'dashboard/bookingTrains', component:BookingTrainsComponent},
  { path: 'booking', component:BookingComponent,canActivate: [AuthGuard]}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
