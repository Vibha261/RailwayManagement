import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PassengerTicket } from 'src/app/shared/models/PassengerTicket';

@Injectable({
  providedIn: 'root'
})
export class TicketBookingService {
  //URL to coonect the backend
  private apiURL = 'https://localhost:7226';

  constructor(private http: HttpClient) { }

  //API call to fetch the Booking Details of a current User.
  //@params:
  //userName: string
  getPassengerTripDetails(userName: string): Observable<PassengerTicket[]> {
    return this.http.get<PassengerTicket[]>(`${this.apiURL}/${userName}`);
  }

  //API call to post the Passenger Tickets Details.
  postBooking(Data:PassengerTicket): Observable<PassengerTicket>{
    return this.http.post<PassengerTicket>(`${this.apiURL}/api/Booking`,Data, { headers: { 'Content-Type': 'application/json' }});
  }

  //API Call to cancel the ticket booking
  cancelBooking(bookingId: string): Observable<any> {
    return this.http.put(`${this.apiURL}/cancel/${bookingId}`, {});
   }

  //API Call to update the Seats Data
  // updateSeatsBooking(updatedSeatData: {trainNumber: string,className: string, date:string, passengerCount:number }): Observable<any> {
  //   return this.http.post<any>(`${this.apiURL}/booking`,updatedSeatData);
  //  }
   
   
}
