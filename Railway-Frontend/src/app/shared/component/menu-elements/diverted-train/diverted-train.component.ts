import { Component } from '@angular/core';
import { TrainService } from 'src/app/services/trainService/train.service';
import { Diverted } from 'src/app/shared/models/diverted';

@Component({
  selector: 'app-diverted-train',
  templateUrl: './diverted-train.component.html',
  styleUrls: ['./diverted-train.component.scss']
})
export class DivertedTrainComponent {

  //variable to store the data of diverted trains.
  divertedtrains: Diverted[] = [];

  constructor(private trainservice: TrainService) {
    this.getDivertedTrain();
  }

  //function calling the API to fetch the data.
  getDivertedTrain(): void {
    this.trainservice.getDivertedTrainsData().subscribe(data => {
      this.divertedtrains = data;
      console.log(data);
      console.log(this.divertedtrains);
    })
  }


}
