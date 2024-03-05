import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { UserService } from 'src/app/services/userService/user.service';
import { Register } from '../../models/registerUserSchema';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  //variable to create a form
  registerForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<RegisterComponent>, public dialog: MatDialog, public userService: UserService) { }

  ngOnInit(): void {
    this.createForm();
  }

  //function to create a registeration form
  createForm(): void {
    this.registerForm = new FormGroup({
       name: new FormControl('', Validators.required),
       email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
       phoneNumber: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10)])),
       userName: new FormControl('', Validators.required),
       password: new FormControl('', Validators.required)
    });
   }

  //function initiated on signUp button
  onSignUp(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      const userData: Register = {
        id: "",
        name: "" + (this.registerForm.get('name').value),
        userName: "" + (this.registerForm.get('userName').value),
        password: "" + (this.registerForm.get('password').value),
        email: "" + (this.registerForm.get('email').value),
        phoneNumber: "" + (this.registerForm.get('phoneNumber').value)
      };
      console.log(userData);
      this.userService.registerUser(userData).subscribe({
        next: (response) => {
           console.log(userData);
           console.log(response);
           alert(this.registerForm.get('name').value + " registered Successfully.");
           this.dialogRef.close();
           this.dialog.open(LoginComponent);
        },
        error: (err) => {
           console.error('Error registering user:', err);
           alert('User Name Already Exists. Try with another UserName');
           this.dialogRef.close();
        }
       });

    }
  }

  //function initiated on old User Button
  onOldUser(): void {
    this.dialog.open(LoginComponent);
    this.dialogRef.close();
  }

}
