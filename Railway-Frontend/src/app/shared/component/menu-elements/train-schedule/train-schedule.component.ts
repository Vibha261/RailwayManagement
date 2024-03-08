import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainService } from 'src/app/services/trainService/train.service';
import { Train } from 'src/app/shared/models/trainSchema';
import { Station } from 'src/app/shared/models/stationSchema';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/userService/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-train-schedule',
  templateUrl: './train-schedule.component.html',
  styleUrls: ['./train-schedule.component.scss']
})
export class TrainScheduleComponent implements OnInit {

  //variable to toggle the display of train details
  trainRouteVisible = false;

  //variable to create form
  trainRouteForm: FormGroup;

  //variable to store the data of trains
  trains: Train[];

  //variable to store the station list data
  routeList: Station[] = [];

  constructor(private toast: ToastrService, private trainservice: TrainService, private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.activate();
  }

  //function to create the form
  createForm(): void {
    this.trainRouteForm = new FormGroup({
      trainNumberOrName: new FormControl('', Validators.required)
    });
  }

  //function to activate the route whenever the train-arrival-predictor component call through the button.
  activate(): void {
    this.route.queryParams.subscribe(params => {
      const trainNumber = params['trainNumber'];
      if (!trainNumber) {
        return;
      }
      this.subscribeTrainService(trainNumber);
      console.log(trainNumber);
    });
  }

  //function initiated on search button click
  //function calls the api to fetch the train schedule.
  getTrainRoute(): void {
    console.log(this.trainRouteForm);
    console.log("inside if");
    if (this.trainRouteForm.valid) {
      console.log(this.trainRouteForm);
      const trainNumberOrName = this.trainRouteForm.get('trainNumberOrName')?.value;
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
          this.toast.error('Invalid train number or no data available for this train number.');
          this.trainRouteVisible = false;
        }
        else {
          this.trains = resp;
          console.log(this.trains);
          this.trainRouteVisible = true;
          this.routeList = this.trains[0].stationListString;
          console.log('parsed data: ', this.routeList);
        }
      },
      error: (err) => {
        console.log('error while fetching the data: ', err);
      }
    });
  }
}
