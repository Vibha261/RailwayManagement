import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TicketBookingService } from 'src/app/services/ticketBooking Service/ticket-booking.service';
import { PassengerTicket } from 'src/app/shared/models/PassengerTicket';

@Component({
  selector: 'app-cancel-dialog-box',
  templateUrl: './cancel-dialog-box.component.html',
  styleUrls: ['./cancel-dialog-box.component.scss']
})
export class CancelDialogBoxComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: PassengerTicket, public dialogRef: MatDialogRef<CancelDialogBoxComponent>, public bookingService: TicketBookingService, public toast: ToastrService) { }

  //function intiated on Confirm Button.
  onConfirm(): void {

    //API Call to cancel the booked ticket.
    this.bookingService.cancelBooking(this.data.id).subscribe({
      next: (response) => {
        console.log(response);
        this.toast.success(`Booking of Booking Id: ${this.data.id} is Cancelled`);
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error(error);
        this.toast.error("Error canceling booking.");
      }
    });
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }

}
