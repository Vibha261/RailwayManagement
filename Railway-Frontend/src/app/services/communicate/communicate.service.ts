import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { bookButton } from 'src/app/shared/models/bookButtonSchema';
import { SearchBookingTrains } from 'src/app/shared/models/searchBooking';

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {

  //Behavior Subject Variable for Search Routes Form
  private searchFormValuesSource = new BehaviorSubject<SearchBookingTrains | null>(null);
  //Observable for Search Route Form
  currentSearchFormValues = this.searchFormValuesSource.asObservable();

  constructor() { }
  //Function to Update the Search Form Values
  updateSearchFormValues(searchFormValues: SearchBookingTrains) {
    this.searchFormValuesSource.next(searchFormValues);
  }

  //Behavior Subject Variable for transferring data from booking-train component to booking component.
  private bookingData = new BehaviorSubject<bookButton | null>(null);

  //Function to set the values
  setBookingData(data: bookButton) {
    this.bookingData.next(data);
  }

  //Function to get the values
  getBookingData() {
    return this.bookingData.asObservable();
  }
}
