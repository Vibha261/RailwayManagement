import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { UserService } from 'src/app/services/userService/user.service';
import { NavigationEnd, Router } from '@angular/router';
import { Register } from '../../models/registerUserSchema';
import { UserAuthenticateService } from 'src/app/services/userService/user-authenticate.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //variable to create a form
  loginForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, public dialog: MatDialog, public userService: UserService, public router: Router, public auth: UserAuthenticateService) {
    //removing current user from storage when the user navigate the HomePage
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          localStorage.removeItem('currentUser');
        }
      }
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  //function to create an login page.
  createForm():void{
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  //function to intiate on successful login
  onSignIn(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.userService.signInUser(this.loginForm.value).subscribe({
        next: (user) => {
          console.log("inside subscription");
          console.log(this.auth.isUserLoggedIn());
          console.log(user);
          this.userService.setCurrentUser(user.userDetails);
          this.dialogRef.close();
          const currentUser=this.userService.getCurrentUser();
          // Checking the user token for authentication
          if (currentUser) {
            this.router.navigate(['/dashboard']);
            this.auth.login();
            console.log("after calling login()");
            console.log(this.auth.isUserLoggedIn());
            console.log("logged in!");
            this.dialogRef.close();
          }
        },
        error: (err) => {
          console.log('error', err);
          alert("Invalid UserName or Password");
        }
      });
    }
  }


}
