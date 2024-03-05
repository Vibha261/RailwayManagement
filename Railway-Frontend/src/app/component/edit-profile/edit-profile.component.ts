import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService/user.service';
import { Register } from 'src/app/shared/models/registerUserSchema';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  //variable for form editing
  editForm: FormGroup;

  //variable to toggel the button edit and save.
  isEditing: boolean = false;

  //variable to store the information about my current user
  currentUser: Register;

  //variable to store the updated information of my current user
  updateUserData: Register  = new Register(null, null, null, null, null, null);

  constructor(public dialogRef: MatDialogRef<EditProfileComponent>, public dialog: MatDialog, public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    //initializing my current user to the variable.
    this.currentUser=this.userService.getCurrentUser();
    console.log(this.currentUser);
    this.createForm();
  }

  //function to create the edit form
  createForm(): void {
    if (this.currentUser) {
      console.log("inside ngonint, currentuser")
      this.editForm = new FormGroup({
        name: new FormControl(this.currentUser.name, Validators.required),
        email: new FormControl(this.currentUser.email, Validators.email),
        phoneNumber: new FormControl(this.currentUser.phoneNumber, Validators.maxLength(10)),
        userName: new FormControl(this.currentUser.userName, Validators.required),
        password: new FormControl('', Validators.required)
      });
    } else {
      alert("Error");
    }
  }

  //function works on Edit button click.
  //function to edit the current user details and call the API to sent the request
  onEdit(): void {
    if (this.editForm.valid) {
      console.log("editform valid");
      if (this.currentUser) {

        //assign the current user id
        this.updateUserData.id = this.currentUser.id;
        console.log("onedit, valid user");

        //comparing the updated values from the current user data
        //Current User Name:
        if (this.editForm.get('name').value !== this.currentUser.name) {
          this.updateUserData.name = this.editForm.get('name').value;
          this.isEditing = true;
        }
        else {
          this.updateUserData.name = this.currentUser.name;
        }

        //Current User Email
        if (this.editForm.get('email').value !== this.currentUser.email) {
          this.updateUserData.email = this.editForm.get('email').value;
          this.isEditing = true;
        }
        else {
          this.updateUserData.email = this.currentUser.email;
        }

        //Current User Phone Number
        if (this.editForm.get('phoneNumber').value !== this.currentUser.phoneNumber) {
          this.updateUserData.phoneNumber = this.editForm.get('phoneNumber').value;
          this.isEditing = true;
        }
        else {
          this.updateUserData.phoneNumber = this.currentUser.phoneNumber;
        }

        //Current User UserName
        if (this.editForm.get('userName').value !== this.currentUser.userName) {
          this.updateUserData.userName = this.editForm.get('userName').value;
          this.isEditing = true;
        }
        else {
          this.updateUserData.userName = this.currentUser.userName;
        }

        //Current User Password
        if (this.editForm.get('password').value !== this.currentUser.password) {
          this.updateUserData.password = this.editForm.get('password').value;
          this.isEditing = true;
        }
        else {
          this.updateUserData.password = this.currentUser.password;
          // alert("You are using Old Password.")
        }

        //Posting updated data to the backed using UserService API Call.
        this.userService.editUser(this.currentUser.id, this.updateUserData).subscribe({
          next: (response) => {
            console.log(this.updateUserData);
            console.log(response);
            alert(this.editForm.get('name').value + " updated successfully.");
            this.userService.setCurrentUser(this.updateUserData);
            window.location.reload();
          },
          error: (err) => {
            console.error('Error updating user:', err);
            alert("Updation Fail.");
          }
        });
      }
    }
  }

  //function to delete the account of the Current User
  //make an API call from UserService
  delete(): void {
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser) {
      this.userService.deleteUser(this.currentUser.id).subscribe({
        next: (response) => {
          console.log('User deleted successfully');
          alert("Account Deleted Successfully.")
          this.dialogRef.close();
          this.router.navigate(['/']); // Redirect to the home page
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert("Not Able to Delete the Account. Server is facing some issues.")
        }
      });
    }
  }

  //just cancel the form and do nothing.
  cancel(): void {
    this.dialogRef.close();
  }
}
