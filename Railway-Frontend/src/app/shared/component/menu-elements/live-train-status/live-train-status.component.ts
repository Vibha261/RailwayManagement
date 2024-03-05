import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-live-train-status',
  templateUrl: './live-train-status.component.html',
  styleUrls: ['./live-train-status.component.scss']
})
export class LiveTrainStatusComponent {

  //variable to create a form
  searchByTrainNumberForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.searchByTrainNumberForm = new FormGroup({
      trainNumber: new FormControl('', Validators.required)
    });
  }
  getTrainDetailList(): void {

  }
}
