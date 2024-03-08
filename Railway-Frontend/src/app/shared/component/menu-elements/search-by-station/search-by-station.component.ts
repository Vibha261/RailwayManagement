import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainService } from 'src/app/services/trainService/train.service';
import { TrainOnStation } from 'src/app/shared/models/trainOnStation';
import { UserService } from '../../../../services/userService/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-search-by-station',
  templateUrl: './search-by-station.component.html',
  styleUrls: ['./search-by-station.component.scss']
})
export class SearchByStationComponent implements OnInit{

  //variable to create form
  searchByStationForm: FormGroup;

  //variable to store all the details the trains on that particular station
  trainsOnStation:TrainOnStation[]=[];

  //variable to toggle whether the train details is visible or not.
  trains=false;

  constructor(private stationservice: TrainService, private userService:UserService, private toast:ToastrService)
  {
  }

  ngOnInit(): void {
    this.createForm();
  }

  //function to create a search by station form
  createForm():void{
    this.searchByStationForm=new FormGroup({
      stationCode: new FormControl('', Validators.required)
    });
  }

  //function initiated on a search button
  //function call the api to fetch the required data.
  getTrainList(): void {
    if (this.searchByStationForm.valid) {
      console.log("inside if");
      console.log(this.searchByStationForm);
      const stationCodeDetail = this.searchByStationForm.get('stationCode')?.value;

      //subscribing the API Observable.
      this.stationservice.getTrainsOnStation(stationCodeDetail).subscribe({
        next: (resp) => {
          //store the user history
          this.stationservice.recentHistoryOneParam(stationCodeDetail);
          
          console.log(resp);
          if (resp.length === 0) {
            this.trains=false;
            this.toast.error('Invalid station code or no data available for this station code.');
          } else {
            this.trainsOnStation = resp;
            console.log(this.trainsOnStation);
            this.trains = true;
          }
        },
        error: (err) => {
          console.log('error while fetching the data: ', err);
        }
      });
    }
  }
}
