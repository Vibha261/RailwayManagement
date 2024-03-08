import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/userService/user.service';
import { CustomerSchema } from 'src/app/shared/models/customerSchema';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.scss']
})
export class CustomerServiceComponent {

  //variable to create a form
  customerServiceForm: FormGroup;;

  constructor(private toast:ToastrService,private customerService: UserService) { }

  ngOnInit(): void {
    this.createForm();
  }

  //function to create the custoomer form
  createForm(): void {
    this.customerServiceForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      query: new FormControl('', Validators.required),
      suggestions: new FormControl('', Validators.required)
    });
  }

  //function called on submit button
  //this function posting the data to backend through API call.
  onSubmit(): void {
    if (this.customerServiceForm.valid) {
      const userData: CustomerSchema = {
        id: "",
        name: "" + (this.customerServiceForm.get('name').value),
        email: "" + (this.customerServiceForm.get('email').value),
        query: "" + (this.customerServiceForm.get('query').value),
        suggestion: "" + (this.customerServiceForm.get('suggestions').value),
      };

      //subscribing the API Observable.
      this.customerService.submitQuery(userData).subscribe({
        next: (response) => {
          console.log('Query submitted successfully', response);
          this.toast.info("Query Submitted Succesfully.");
          window.location.reload();

        },
        error: (err) => {
          console.error('Error submitting query', err);
          this.toast.error("Submission Fail");

        }
      });
    }
  }
}

