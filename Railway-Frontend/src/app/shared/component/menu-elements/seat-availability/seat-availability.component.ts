import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainService } from 'src/app/services/trainService/train.service';
import { ClassesName } from 'src/app/shared/models/classesInTrain';
import { Seats } from 'src/app/shared/models/seatAvailabity';
import { UserService } from '../../../../services/userService/user.service';

@Component({
  selector: 'app-seat-availability',
  templateUrl: './seat-availability.component.html',
  styleUrls: ['./seat-availability.component.scss']
})
export class SeatAvailabilityComponent implements OnInit {

  //variable to toggle the fare of seats
  fareVisible = false;

  //variable to toggle the display of train data
  trainVisible = false;

  //variable to store the seat Type to check the selected seat type in HTML file.
  seatType: string;

  //variable to create a form
  searchByTrainNumberForm: FormGroup;

  //variable to store the data of seats.
  seats: Seats;

  //variable to store the data of classes in seats
  seatsInClass: ClassesName[] = [];

  constructor(private trainservice: TrainService, private userService: UserService) { }

  ngOnInit(): void {
    this.fareVisible = false;
    this.trainVisible = false;
    this.createForm();
  }

  //function to create the search form
  createForm():void{
    this.searchByTrainNumberForm = new FormGroup({
      trainNumber: new FormControl('', Validators.required),
      date: new FormControl(new Date(), Validators.required)
    });
  }

  //function initiated on search button
  //function calls the api to fetch the data of train and its seats.
  getTrain(): void {
    if (this.searchByTrainNumberForm.valid) {
      const trainNumber = this.searchByTrainNumberForm.get('trainNumber')?.value;
      const selectedDate = this.searchByTrainNumberForm.get('date')?.value;
      const formattedDate = formatDate(selectedDate, 'yyyy-MM-dd', 'en-US');

      //subscribing the API Call
      this.trainservice.getSeatsInfoInTrain(trainNumber, formattedDate).subscribe({
        next: (data) => {

          //store the user history
          this.trainservice.recentHistoryTwoParam(trainNumber,formattedDate);

          if (!data) {
            alert('Invalid train number or no data available for this train number.');
          } else {
            this.seats = data;
            this.seatsInClass = this.seats.classes;
            this.trainVisible = true;
          }
        },
        error: (err) => {
          console.log('error while fetching the seat data: ', err);
        }
      });
    }
  }

  //function to display the Fare of particular seatType.
  onSeatClick(seatClassName: string): void {
    this.fareVisible = true;
    this.seatType = seatClassName;
  }
}
