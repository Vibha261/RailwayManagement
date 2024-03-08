import { Component, OnInit } from '@angular/core';
import { TicketBookingService } from 'src/app/services/ticketBooking Service/ticket-booking.service';
import { UserService } from 'src/app/services/userService/user.service';
import { PassengerList } from 'src/app/shared/models/PassengerList';
import { PassengerTicket } from 'src/app/shared/models/PassengerTicket';
import { Register } from 'src/app/shared/models/registerUserSchema';
import { jsPDF } from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';
import { MatDialog } from '@angular/material/dialog';
import { CancelDialogBoxComponent } from '../cancel-dialog-box/cancel-dialog-box.component';


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

  filteredTrips: PassengerTicket[];

  //variable to store passenger details.
  passengerDetails: PassengerList[] = [];

  constructor(private toast: ToastrService, private userService: UserService, private bookingService: TicketBookingService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.getTripDetails('Booked');
  }

  //function to fetch the booking details
  getTripDetails(filterStatus: string): void {
    console.log(this.currentUser.userName);
    this.bookingService.getPassengerTripDetails(this.currentUser.userName).subscribe({
      next: (data) => {
        console.log(data);
        this.tripDetails = data;
        this.filteredTrips = this.tripDetails.filter((trip) => trip.status === 'Booked');
        console.log(this.tripDetails);
        this.filterTrips(filterStatus);
      }
    })
  }

  //function filtering the trips according to the status
  filterTrips(event: any): void {
    const filterStatus = event.target.value;
    
    if (filterStatus === 'Booked') {
      this.filteredTrips = this.tripDetails.filter((trip) => trip.status === 'Booked');
    }
    else if (filterStatus === 'Cancelled') {
      this.filteredTrips = this.tripDetails.filter((trip) => trip.status === 'Cancelled');
    }
  }

  savePDF(): void {
    const data = document.getElementById('contentToConvert');
    html2canvas(data!).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Ticket.pdf');
    });
  }

  //function to cancel the booking
  cancelBooking(trip: PassengerTicket): void {
    const dialogRef = this.dialog.open(CancelDialogBoxComponent, {
      data: trip
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.getTripDetails('Booked');
      }
    });
  }

}
