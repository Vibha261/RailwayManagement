import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommunicateService } from 'src/app/services/communicate/communicate.service';
import { TicketBookingService } from 'src/app/services/ticketBooking Service/ticket-booking.service';
import { UserService } from 'src/app/services/userService/user.service';
import { PassengerList } from 'src/app/shared/models/PassengerList';
import { PassengerTicket } from 'src/app/shared/models/PassengerTicket';
import { bookButton } from 'src/app/shared/models/bookButtonSchema';
import { Register } from 'src/app/shared/models/registerUserSchema';
import { ToastrService } from 'ngx-toastr';

declare const Razorpay: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  //variable to store train details corresponding to the selected train and type of class.
  trainDetails: bookButton;

  //variable to create a form
  bookingForm: FormGroup;

  //variable to store the ticket Details of the passenger.
  ticketDetails: PassengerTicket;

  //variable to store the current logged in user.
  currentUser: Register;

  //variable to store the price of the seat
  fare: number;

  //variable to store the GST apply to the payment
  gstCharge: number = 0.18;

  //variable to apply the platform fee to the payment
  platformFee: number = 23;

  //use the formBuilder to create the formArray.
  constructor(private toast: ToastrService, private fb: FormBuilder, private router: Router, private userService: UserService, private communicate: CommunicateService, private ticketService: TicketBookingService) { }

  ngOnInit(): void {
    this.subscribeTheBookingTrainDetails();
    this.createForm();
    this.currentUser = this.userService.getCurrentUser();
  }

  //Subscription call to get the data from the booking-ticket component.
  subscribeTheBookingTrainDetails(): void {
    this.communicate.getBookingData().subscribe(data => {
      if (data) {
        console.log(data);
        this.trainDetails = data;
        this.fare = this.trainDetails.fare;
      }
    });
  }

  //creating Form to add Passenger Details and initialize the train details corresponding to the click event. 
  createForm(): void {
    this.bookingForm = this.fb.group({
      passengers: this.fb.array([this.createPassengerFormGroup()]),
      contact: this.fb.group({
        phoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      })
    });
  }

  //function to create form in an array.
  createPassengerFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      berthPreference: ['', Validators.required],
      nationality: ['', Validators.required]
    });
  }

  //reteriving the details of passenger from an Array.
  get passengers(): FormArray {
    console.log(this.bookingForm.value);
    return this.bookingForm.get('passengers') as FormArray;
  }

  //function to push the new passenger details in the passenger Array.
  addPassenger(): void {
    this.passengers.push(this.createPassengerFormGroup());
    this.toast.success("Passenger Added Successfully");
  }

  //function to remove the extra added passengers fields and one field is mandatory.
  removePassenger(index: number): void {
    if (this.passengers.length > 1) {
      this.passengers.removeAt(index);
      this.toast.success("Passenger Removed Succesfully");
    }
    else {
      console.log("Cannot remove");
      this.toast.error("Cannot Remove")
    }
  }

  //function to calculate the fare Price.
  calculateTotalPrice(): number {
    const passengersCount = this.passengers.length;
    const totalFare = passengersCount * this.fare;
    const gst = totalFare * this.gstCharge;
    const totalPrice = totalFare + gst + this.platformFee;
    return totalPrice;
  }

  //function to integrate the payment options iniate on the click.
  onSubmit(): void {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: Math.floor(this.calculateTotalPrice()) * 100,
      name: 'Ticket Booking',
      key: 'rzp_test_A0x90SYHBfArPO',
      order_id: null,
      image: '',
      prefill: {
        name: this.currentUser.userName,
        email: this.currentUser.email,
        phone: this.currentUser.phoneNumber
      },
      theme: {
        color: '#000000'
      },
      handler: () => {
        this.sendTheConfirmedBookedData();
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed')
        }
      }
    }
    Razorpay.open(RozarpayOptions);
  }

  //function to be handle after the succesfull confirmation of payments.
  sendTheConfirmedBookedData(): void {
    const ticketDetails: PassengerTicket = {
      id: '',
      userName: this.currentUser.userName,
      trainNumber: this.trainDetails.trainNumber,
      trainName: this.trainDetails.trainName,
      fromStation: this.trainDetails.fromStation,
      fromStationArrivalTime: this.trainDetails.fromStationArrivalTime,
      fromStationDepartureTime: this.trainDetails.fromStationDepartureTime,
      toStation: this.trainDetails.toStation,
      toStationArrivalTime: this.trainDetails.toStationArrivalTime,
      toStationDepartureTime: this.trainDetails.toStationDepartureTime,
      date: this.trainDetails.date,
      className: this.trainDetails.className,
      passengers: this.bookingForm.get('passengers').value.map((passenger: PassengerList) => ({
        name: passenger.name,
        age: passenger.age,
        gender: passenger.gender,
        berthPreference: passenger.berthPreference,
        seatNo: 0
      })),
      phoneNumber: this.bookingForm.get('contact.phoneNumber').value,
      email: this.bookingForm.get('contact.email').value,
      amount: this.calculateTotalPrice().toString(),
      status: ''
    };

    //API call to add the user's ticket details.
    this.ticketService.postBooking(ticketDetails).subscribe({
      next: (response) => {
        console.log(response);
        this.toast.success(`Hy ${this.currentUser.userName} Ticket Booked Successfully`)
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
      }
    });

  }
}
