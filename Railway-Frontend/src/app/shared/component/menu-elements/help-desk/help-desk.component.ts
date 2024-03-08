import { Component } from '@angular/core';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.scss']
})
export class HelpDeskComponent {

  //Data to be displayed on Help Desk Page
  questions = [
    {
      question: 'Where to find a Schedule of a train?',
      answer: 'To Find the Schedule of any train, Navigate to Home Page: Home > Train Schedules'
    },
    {
      question: 'How to check the live status of train?',
      answer: 'To find the Live Status, Navigate to Home Page: Home > Live Status.'
    },
    {
      question: 'How to Access the features',
      answer: 'For that it is Recommended to use station codes instead of Station Names and Train Numbers instead of train names.'
    }

  ];
}
