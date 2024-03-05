import { Component } from '@angular/core';
import { TrainService } from 'src/app/services/trainService/train.service';
import { Cancelled } from 'src/app/shared/models/cancelled';

@Component({
  selector: 'app-cancelled-train',
  templateUrl: './cancelled-train.component.html',
  styleUrls: ['./cancelled-train.component.scss']
})
export class CancelledTrainComponent {

  //variable to storethe cancelled trains data
  cancelledtrains: Cancelled[] = [];

  constructor(private trainservice: TrainService) {
    this.getCancelledTrain();
  }

  //function call the api to fetch the data.
  getCancelledTrain(): void {
    this.trainservice.getCancelledTrainsData().subscribe(data => {
      this.cancelledtrains = data;
      console.log(data);
      console.log(this.cancelledtrains);
    })
  }

}
