import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { Register } from 'src/app/shared/models/registerUserSchema';
import { UserService } from 'src/app/services/userService/user.service';
import { UserAuthenticateService } from 'src/app/services/userService/user-authenticate.service';
import { TrainService } from 'src/app/services/trainService/train.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit {
  dropdownVisible: boolean = false;
  currentUser: Register; 
  emptyRecentSearches: string[];

  constructor(private router: Router, private dialog: MatDialog, private userService: UserService, private auth:UserAuthenticateService, private trainservice:TrainService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser(); 
    if (!this.userService.getCurrentUser()) {
      this.router.navigate(['/login']);
    }
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  onLogout(): void {
    localStorage.removeItem('currentUser');
    localStorage.setItem('recentSearchHistory', JSON.stringify(this.emptyRecentSearches));
    this.router.navigate(['/']);
    this.auth.logout();
    console.log(this.auth.isUserLoggedIn());
    this.trainservice.setRecentHistory();
  }

  showEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent);
  }
}
