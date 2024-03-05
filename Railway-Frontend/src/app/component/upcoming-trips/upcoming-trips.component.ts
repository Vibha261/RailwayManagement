import { Component, OnInit } from '@angular/core';
import { TicketBookingService } from 'src/app/services/ticketBooking Service/ticket-booking.service';
import { UserService } from 'src/app/services/userService/user.service';
import { PassengerList } from 'src/app/shared/models/PassengerList';
import { PassengerTicket } from 'src/app/shared/models/PassengerTicket';
import { Register } from 'src/app/shared/models/registerUserSchema';

@Component({
  selector: 'app-upcoming-trips',
  templateUrl: './upcoming-trips.component.html',
  styleUrls: ['./upcoming-trips.component.scss']
})
export class UpcomingTripsComponent implements OnInit {

  //variable to store current user details
  currentUser: Register;

  //variable to store tripDetails selected by user
  tripDetails: PassengerTicket[];

  //variable to store passenger details.
  passengerDetails: PassengerList[] = [];

  constructor(private userService: UserService, private bookingService: TicketBookingService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.getTripDetails();
  }

  //function to fetch the booking details
  getTripDetails(): void {
    console.log(this.currentUser.userName);
    this.bookingService.getPassengerTripDetails(this.currentUser.userName).subscribe({
      next: (data) => {
        console.log(data);
        this.tripDetails = data;
        console.log(this.tripDetails);
      }
    })
  }

  //function to cancel the booking
  cancelBooking(bookingId: string): void {
    this.bookingService.cancelBooking(bookingId).subscribe({
       next: (response) => {
         console.log(response);
         alert("Booking cancelled successfully!");
         this.getTripDetails();
       },
       error: (error) => {
         console.error(error);
         alert("Error canceling booking.");
       }
    });
   }
   
}
