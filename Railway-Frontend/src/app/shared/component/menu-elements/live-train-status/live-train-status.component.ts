import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { differenceInMinutes, parse } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TrainService } from 'src/app/services/trainService/train.service';
import { LiveStatus } from 'src/app/shared/models/liveStatusSchema';
import { Station } from 'src/app/shared/models/stationSchema';
import { Train } from 'src/app/shared/models/trainSchema';

@Component({
  selector: 'app-live-train-status',
  templateUrl: './live-train-status.component.html',
  styleUrls: ['./live-train-status.component.scss']
})
export class LiveTrainStatusComponent {

  //variable to toggle the display of train details
  trainRouteVisible = false;

  //variable to create form
  trainRouteForm: FormGroup;

  //variable to store the data of trains
  trains: Train[];

  //variable to store the station list data
  routeList: Station[] = [];



  stationStatus: LiveStatus=new LiveStatus(null, null, null);

  currentDay: string;
  currentTime: string;
  trainStatus: string;

  progress: number=0;

  currentDistance:string = null;
  totalDistance = null;

  previousStationTime:string='00:00';

  constructor(private trainservice: TrainService, private toast:ToastrService) { }

  ngOnInit(): void {
    this.createForm();

  }

  createForm(): void {
    this.trainRouteForm = new FormGroup({
      trainNumber: new FormControl('', Validators.required)
    });
  }

  getTrainDetail(): void {
    console.log(this.trainRouteForm);
    console.log("inside if");
    if (this.trainRouteForm.valid) {
      console.log(this.trainRouteForm);
      const trainNumberOrName = this.trainRouteForm.get('trainNumber')?.value;
      this.subscribeTrainService(trainNumberOrName);

    }
  }

  //subscribing the API Observable
  subscribeTrainService(trainNumberOrName: string): void {
    this.trainservice.getTrainsByTrainNumber(trainNumberOrName).subscribe({
      next: (resp) => {

        //store the user history
        this.trainservice.recentHistoryOneParam(trainNumberOrName);

        if (resp.length === 0) {
          // alert("invalid");
          this.toast.error('Invalid train number or no data available for this train number.');
          this.trainRouteVisible = false;
        }
        else {
          // this.trains = resp;

          this.trains = resp.map(train => {
            const trainObj: TrainRoutes = {
              ...train,
              istrainRouteVisible: false
            };
  
            return trainObj;
          });
          console.log(this.trains);

          //current Day
          this.currentDay = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
          this.currentDay = this.currentDay.charAt(0).toUpperCase() + this.currentDay.slice(1).toLowerCase();
          console.log("Current Day");
          console.log(this.currentDay);

          //current Time
          this.currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
          //for testing purpose.
          // this.currentTime='22:40'; //For 12155 train
          // this.currentTime='22:20'; //for 12155 train
          this.currentTime='22:17' //for 20802 train
          // this.currentTime='18:00';
          // this.currentTime='11:40';//for 12243 train
          console.log("current time");
          console.log(this.currentTime);


          console.log(this.trains);
          this.trainRouteVisible = true;
          this.routeList = this.trains[0].stationListString;
          console.log('parsed data: ', this.routeList);
          this.liveStatus();
        }
      },
      error: (err) => {
        console.log('error while fetching the data: ', err);
        this.toast.error("Error");
      }
    });
  }

  liveStatus(): void {
    if (this.trains[0][`trainRunsOn${this.currentDay}`] === 'Y') {
      for (let i = 0; i < this.routeList.length; i++) {
        const station = this.routeList[i];
  
        const arrivalTime = parse(station.arrivalTime, 'HH:mm', new Date());
        const departureTime = parse(station.departureTime, 'HH:mm', new Date());
        const previousStationDepartureTime = parse(this.previousStationTime,'HH:mm', new Date());
        const currentTime = parse(this.currentTime, 'HH:mm', new Date());
  
        if (i === 0 && currentTime.getTime() <= departureTime.getTime() && station.arrivalTime === '--') {
          this.trainStatus = 'Yet To Start.';
          this.stationStatus.previousStation = null;
          this.stationStatus.currentStation = station;
          this.stationStatus.nextStation = this.routeList[i + 1];
          this.currentDistance = this.stationStatus.currentStation.distance;
          this.calculateProgress();
          break;
        } if (currentTime >= arrivalTime && currentTime <= departureTime) {
          this.trainStatus = 'Train is at the ' + station.stationName + ' station and going to be depart in '+this.calculateTime(station.departureTime, this.currentTime);
          this.stationStatus.previousStation = this.routeList[i - 1];
          this.previousStationTime=this.stationStatus.previousStation.departureTime;
          this.stationStatus.currentStation = station;
          this.currentDistance=this.stationStatus.currentStation.distance;
          this.stationStatus.nextStation = this.routeList[i + 1];
          this.calculateProgress();
          break;
        } if (i - 1 >= 0 && currentTime >previousStationDepartureTime && currentTime < arrivalTime) {
          this.trainStatus = 'In between ' + this.routeList[i - 1].stationName + ' and ' + station.stationName + ".";
          this.stationStatus.previousStation = this.routeList[i - 1];
          this.previousStationTime=this.stationStatus.previousStation.departureTime;
          this.currentDistance = this.stationStatus.previousStation.distance;
          this.stationStatus.currentStation = null;
          this.stationStatus.nextStation = station;
          this.calculateProgress();
          break;
        } 
        if(i===this.routeList.length-1) {
          this.trainStatus = 'Train has reached the destination station.';
          this.stationStatus.previousStation = this.routeList[this.routeList.length - 2];
          this.stationStatus.currentStation = this.routeList[this.routeList.length - 1];
          this.currentDistance=this.stationStatus.currentStation.distance;
          this.stationStatus.nextStation = null;
          this.calculateProgress();
          break;
        }
      }
      this.calculateProgress();
    } else {
      this.trainStatus = null;
      this.toast.error('Train does not run today.');
    }
  }

  calculateTime(departureTime:string, currentTime:string){
    const formatString = 'HH:mm';
    const time1 = parse(departureTime, formatString, new Date());
    const time2 = parse(currentTime, formatString, new Date());
    const diff = differenceInMinutes(time1, time2);
    console.log("Time Difference: ");
    console.log(diff);
    return diff > 0 ? `${diff} min` : `${diff} min`;
  }

  calculateProgress(): void {
    let curr=0;
    let total=0;
    
    if (this.currentDistance) {
       curr = parseInt(this.currentDistance, 10);
       console.log("Current Distance:");
       console.log(curr);
    }

    if (this.routeList.length > 0) {
       const lastStation = this.routeList[this.routeList.length - 1];
       this.totalDistance = lastStation.distance;
       total = parseInt(this.totalDistance, 10);
       console.log("Total Distance:");
       console.log(total);
    }

    if (total> 0) {
       this.progress = (curr / total) * 100;
       console.log("Progress: ");
       console.log(this.progress);
    } else {
       this.progress = 0;
    }
   }
   
}

class TrainRoutes extends Train {
  istrainRouteVisible:boolean= false;
}