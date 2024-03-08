import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { LoginComponent } from '../../shared/component/login/login.component';
import { RegisterComponent } from 'src/app/shared/component/register/register.component';
import { UserAuthenticateService } from 'src/app/services/userService/user-authenticate.service';
import { TrainService } from 'src/app/services/trainService/train.service';


declare var google: any;

@Component({
   selector: 'app-main-display',
   templateUrl: './main-display.component.html',
   styleUrls: ['./main-display.component.scss']
})
export class MainDisplayComponent implements OnInit {

   //variable to decide whether to display the page or not.
   showMainContent:boolean = true;

   constructor(private router: Router, public dialog: MatDialog, public auth: UserAuthenticateService, public trainservice:TrainService) {
   }
   ngOnInit(): void {
      this.showContent();
      this.auth.logout();
      localStorage.removeItem('currentUser');
      this.trainservice.setRecentHistory();
      
   }

   //function to toggle the display of main-page
   showContent():void{
      this.router.events.subscribe(event => {
         if (event instanceof NavigationEnd) {
            if (event.url !== '/') {
               this.showMainContent = false;
            } else {
               this.showMainContent = true;
            }
         }
      });
   }

   //function to open the SignIn Dialog box.
   openSignInDialog(): void {
      const dialogRef = this.dialog.open(LoginComponent);

      dialogRef.afterClosed().subscribe(result => {
         if (result) {
            this.openSignUpDialog();
         }
      });
   }

   //function to open SignUp Dialog box.
   openSignUpDialog(): void {
      this.dialog.open(RegisterComponent);
   }
}
