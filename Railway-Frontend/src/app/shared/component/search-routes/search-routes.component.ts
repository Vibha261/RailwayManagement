import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchBookingTrains } from '../../models/searchBooking';
import { UserService } from 'src/app/services/userService/user.service';
import { CommunicateService } from 'src/app/services/communicate/communicate.service';

@Component({
  selector: 'app-search-routes',
  templateUrl: './search-routes.component.html',
  styleUrls: ['./search-routes.component.scss']
})
export class SearchRoutesComponent implements OnInit {

  //variable to create form
  searchForm: FormGroup;

  //to initate the date select by user from the calender.
  datePickerOpened = true;

  constructor(private router: Router, private userService: UserService, private communicate:CommunicateService) { }

  ngOnInit(): void {
    this.createForm();
  }

  //function to create the search form
  createForm():void{
    this.searchForm = new FormGroup({
      'from': new FormControl('', Validators.required),
      'to': new FormControl('', Validators.required),
      'allClasses': new FormControl(''),
      'quota': new FormControl(''),
      'date': new FormControl('', Validators.required)
    });
  }

  //function called on the Search Button Click 
  onSubmit(): void {
    if (this.searchForm.valid) {
      const userData: SearchBookingTrains = {
        from: "" + (this.searchForm.get('from').value),
        to: "" + (this.searchForm.get('to').value),
        allClasses: "" + (this.searchForm.get('allClasses').value),
        quota: "" + (this.searchForm.get('quota').value),
        date: "" + (this.searchForm.get('date').value)
      };
      // sessionStorage.setItem('searchFormValues', JSON.stringify(userData));
      this.communicate.updateSearchFormValues(userData);

      this.router.navigate(['/bookingTrains'],{ queryParams: { ...this.searchForm.getRawValue() } });
    }
  }
}
