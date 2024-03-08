import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { Register } from 'src/app/shared/models/registerUserSchema';
import { UserService } from 'src/app/services/userService/user.service';
import { UserAuthenticateService } from 'src/app/services/userService/user-authenticate.service';
import { TrainService } from 'src/app/services/trainService/train.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit {

  //variable to toggle the display of menu
  dropdownVisible: boolean = false;

  //variable to store the current user details.
  currentUser: Register;

  constructor(public toast: ToastrService, private router: Router, private dialog: MatDialog, private userService: UserService, private auth: UserAuthenticateService, private trainservice: TrainService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    if (!this.userService.getCurrentUser()) {
      this.router.navigate(['/login']);
    }
  }

  //function to toggle the dropDown
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  //on logout the local storage gets empty.
  onLogout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
    this.auth.logout();
    console.log(this.auth.isUserLoggedIn());
    this.trainservice.setRecentHistory();
    this.toast.success("Logged Out Successfully")
  }

  //function to open the edit profile Dialog box.
  showEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditProfileComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
}
