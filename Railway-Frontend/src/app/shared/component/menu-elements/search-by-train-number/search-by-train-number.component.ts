import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainService } from 'src/app/services/trainService/train.service';
import { Train } from 'src/app/shared/models/trainSchema';
import { UserService } from '../../../../services/userService/user.service';
import { Register } from 'src/app/shared/models/registerUserSchema';



@Component({
  selector: 'app-search-by-train-number',
  templateUrl: './search-by-train-number.component.html',
  styleUrls: ['./search-by-train-number.component.scss']
})
export class SearchByTrainNumberComponent {

  //variable to display the required details
  trainVisible = false;

  //variable to create the form
  searchByTrainNumberForm: FormGroup;

  //variable to store the trains data.
  trains: Train[];

  constructor(private trainservice: TrainService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  //function to create the searchBytrainNumbeForm
  createForm(): void {
    this.searchByTrainNumberForm = new FormGroup({
      trainNumber: new FormControl('', Validators.required)
    });
  }

  //function initiated on search button
  //function calls the api to get the train data by using train number
  getTrain(): void {
    console.log(this.searchByTrainNumberForm);
    console.log("inside if");
    if (this.searchByTrainNumberForm.valid) {
      console.log(this.searchByTrainNumberForm);
      const trainNumber = this.searchByTrainNumberForm.get('trainNumber')?.value;

      //subscribing the API Observable.
      this.trainservice.getTrainsByTrainNumber(trainNumber).subscribe({
        next: (data) => {
          //store the user history
          this.trainservice.recentHistoryOneParam(trainNumber);
          // console.log(data);
          if (data.length === 0) {
            alert('Invalid train number or no data available for this train number.');
            this.trainVisible = false;
          }
          else {
            this.trains = data;
            console.log(this.trains);
            this.trainVisible = true;
          }
        },
        error: (err) => {
          console.log('error while fetching the data: ', err);
        }
      });
    }
  }
}
