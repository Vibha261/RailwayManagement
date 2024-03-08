import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainService } from 'src/app/services/trainService/train.service';
import { TrainOnStation } from 'src/app/shared/models/trainOnStation';
import { Train } from 'src/app/shared/models/trainSchema';
import { differenceInMinutes, parse } from 'date-fns';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-train-arrival-predictor',
  templateUrl: './train-arrival-predictor.component.html',
  styleUrls: ['./train-arrival-predictor.component.scss']
})
export class TrainArrivalPredictorComponent {

  //variable to toogle display the trains data
  trainVisible: boolean = false;

  //variable to create form
  timePredictionForm: FormGroup;

  //variable to store the predicted data of a train
  trainPredictedDetail: TrainOnStation;

  //variable to store the original data of train
  trainOriginalData: Train[];

  //variable to store the stations data.
  stationData: TrainOnStation[];

  constructor(private trainservice: TrainService, private router: Router, private userService: UserService, private toast: ToastrService) 
  {
  }

  ngOnInit(): void {
    this.createForm();
  }

  //function to create the timePredictionForm
  createForm():void{
    this.timePredictionForm = new FormGroup({
      trainNumber: new FormControl('', Validators.required),
      stationCode: new FormControl('', Validators.required)
    });
  }

  //function initiated on search button
  //function calls the API to fetch the data for predicted time and original time.
  getArrivalTime(): void {
    console.log(this.timePredictionForm);
    console.log("inside if");
    if (this.timePredictionForm.valid) {
      console.log(this.timePredictionForm);
      const trainNumber = this.timePredictionForm.get('trainNumber')?.value;
      const stationCode = this.timePredictionForm.get('stationCode')?.value;

      //subscribe the API Observable
      this.trainservice.getPredictedTime(trainNumber, stationCode).subscribe({
        next: (resp) => {

          //store the user history
          this.trainservice.recentHistoryTwoParam(trainNumber,stationCode);

          if (resp === null) {
            this.toast.error('Invalid train number or Station code.');
            this.trainVisible=false;
          } else {
            this.trainPredictedDetail = resp;
            console.log(this.trainPredictedDetail);
            this.trainVisible = true;
          }
        },
        error: (err) => {
          console.log('error while fetching the data: ', err);
        }
      });

      //subscribe the API Observable
      this.trainservice.getTrainsOnStation(stationCode).subscribe({
        next: (data) => {
          this.stationData = data;
          this.calculateDelay(trainNumber)
        }
      });
    }
  }

  //function to calculate the Train Delays
  //@params:
  //trainNumber: string
  calculateDelay(trainNumber: string): void {
    const originalArrivalTime = this.stationData.find(station => station.trainNumber === trainNumber)?.arrivalTime;
    if (originalArrivalTime) {
      const predictedArrivalTime = this.trainPredictedDetail.arrivalTime;
      const delay = this.calculateTimeDifference(originalArrivalTime, predictedArrivalTime);

      this.trainPredictedDetail.arrivalTime = `${originalArrivalTime} -> ${predictedArrivalTime} (Delay: ${delay})`;
    }
  }

  //function to calculate the time differnce
  //@param:
  //time1: string
  //time2: string
  calculateTimeDifference(time1: string, time2: string): string {
    const formatString = 'HH:mm';
    const time1Date = parse(time1, formatString, new Date());
    const time2Date = parse(time2, formatString, new Date());
    const diff = differenceInMinutes(time2Date, time1Date);
    return diff > 0 ? `${diff} minutes` : `${diff} minutes`;
  }

  //function to navigate to train schedule component on click of train schedule
  navigate(trainNumber: string) {
    this.router.navigate(['/trainSchedule'], { queryParams: { trainNumber } });
  }

}
