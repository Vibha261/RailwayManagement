import { Component, OnInit } from '@angular/core';
import { SearchBookingTrains } from '../../models/searchBooking';
import { TrainService } from 'src/app/services/trainService/train.service';
import { BookingTrainSchema } from '../../models/bookingTrainSchema';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Seats } from '../../models/seatAvailabity';
import { ClassesName } from '../../models/classesInTrain';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { UserService } from 'src/app/services/userService/user.service';
import { CommunicateService } from 'src/app/services/communicate/communicate.service';
import { Subscription } from 'rxjs';
import { bookButton } from '../../models/bookButtonSchema';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking-trains',
  templateUrl: './booking-trains.component.html',
  styleUrls: ['./booking-trains.component.scss']
})
export class BookingTrainsComponent implements OnInit {
  //variale to create a form
  FormValues: SearchBookingTrains;

  private searchFormValuesSubscription: Subscription;

  //variable to store the train Details in an array of type BookingTrainSchema
  trainDetails: TrainDetailsWithSeats[] = [];

  //variable to store the date of string type
  date: string;

  //variable to store the data of seats data corresponding to the train Details.
  seats: Seats;

  //variable to store the data of seats according to the type of seatClass;
  seatsInClass: ClassesName[] = [];

  //variable to toggle the Seat Data Visibility 
  seatDataVisible: boolean = false;

  //variable to store the selected Train Number
  selectedTrainNumber: string

  constructor(private router: Router, private trainService: TrainService, private dialog: MatDialog, private userservice: UserService, private communicate: CommunicateService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.subscribingTheSearchFormValues();
    console.log("booking train ngOnInit");
    this.fetchTrainData();
    // this.FormValues=sessionStorage['get']('searchFormValues');
  }

  //subscribing the searchform values observable
  subscribingTheSearchFormValues(): void {
    this.searchFormValuesSubscription = this.communicate.currentSearchFormValues.subscribe(searchFormValues => {
      if (searchFormValues) {
        this.FormValues = searchFormValues;
        console.log(this.FormValues);
      }
    })
  }

  //to destroy the subscription
  ngOnDestroy(): void {
    if (this.searchFormValuesSubscription) {
      this.searchFormValuesSubscription.unsubscribe();
    }
  }

  //function to fetch the trainData between the stations
  fetchTrainData(): void {
    console.log(this.FormValues.from);
    console.log(this.FormValues.to);
    const selectedDate = this.FormValues.date;
    const formattedDate = formatDate(selectedDate, 'yyyy-MM-dd', 'en-US');
    this.date = formattedDate;

    //subscribing the API Observable
    this.trainService.getTrainsBetweenStations(this.FormValues.from, this.FormValues.to).subscribe({
      next: (data) => {
        console.log(data);
        this.trainDetails = data.map(train => {
          const trainObj: TrainDetailsWithSeats = {
            ...train,
            isSeatDetailsVisible: false
          };

          return trainObj;
        });
        console.log(this.trainDetails);
      },
      error: (err) => {
        console.log("Error in fetching data");
      }
    });
  }

  //to navigate to train schedule component on train schedule button click
  navigate(trainNumber: string): void {
    this.router.navigate(['/trainSchedule'], { queryParams: { trainNumber } });
  }

  //function to display the seats details corresponding to train
  seatsDetails(train: TrainDetailsWithSeats): void {
    // this.selectedTrainNumber = trainNumber;
    if (train?.isSeatDetailsVisible) {
      train.isSeatDetailsVisible = false;
      return;
    }
    this.trainService.getSeatsInfoInTrain(train.trainNumber, this.date).subscribe({
      next: (data) => {
        console.log(data);
        if (data === null) {
          this.toast.error('Seats Data is not available');
        } else {
          this.seats = data;
          this.seatsInClass = this.seats.classes;
          this.seatDataVisible = true;
          train.isSeatDetailsVisible = true;
        }
      },
      error: (err) => {
        console.log('error while fetching the seat data: ', err);
        this.toast.error('Seats Data is not available');
      }
    });
  }

  //function called on book button
  //@params:
  //trainNumber:string;
  //className:string;
  bookTrain(trainNumber: string, className: string): void {
    const currentUser = this.userservice.getCurrentUser();
    if (!currentUser) {

      this.dialog.open(LoginComponent);
    } 
    else {
      const train = this.trainDetails.find(t => t.trainNumber === trainNumber);
      if (!train) {
        this.toast.error('Train not found');
        return;
      }

      const seatClass = this.seatsInClass.find(sc => sc.className === className);
      if (!seatClass) {
        this.toast.error('Seat class not found');
        return;
      }

      // Store the train and seat details in localStorage
      const bookButtonData: bookButton = {
        userName: currentUser.userName,
        trainNumber: train.trainNumber,
        trainName: train.trainName,
        fromStation: train.fromStation,
        fromStationArrivalTime: train.fromStationArrivalTime,
        fromStationDepartureTime: train.fromStationDepartureTime,
        toStation: train.toStation,
        toStationArrivalTime: train.toStationArrivalTime,
        toStationDepartureTime: train.toStationDepartureTime,
        className: seatClass.className,
        availableSeats: seatClass.availableSeats,
        fare: seatClass.fare,
        date: this.date
     };

     //set the data to behavior Subject to communicate with booking component.
     this.communicate.setBookingData(bookButtonData);

      // Navigate to the booking module
      this.router.navigate(['/booking']);
    }
  }
}

class TrainDetailsWithSeats extends BookingTrainSchema {
  isSeatDetailsVisible: boolean = false;
}
