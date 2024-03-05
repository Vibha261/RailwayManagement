import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from 'src/app/shared/models/registerUserSchema';
import { Observable } from 'rxjs';
import { CustomerSchema } from 'src/app/shared/models/customerSchema';
import { UserSignInResponse } from 'src/app/shared/response/userSignInResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //URL for backend connection
  private apiURL = 'https://localhost:7226/';


  constructor(private http: HttpClient) { }

  //setting the cuurent loggedIn User
  //@params: 
  //user of type Register
  setCurrentUser(user: Register) {
    console.log('Setting current user:', user);
    console.log(user.email);
    // console.log(user.message);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  //Retrieving the current user data to access the details in DashBoard and BookingTickets.
  getCurrentUser(): Register {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  //API call for New User Registeration
  //@params: 
  //user of type Register
  registerUser(user: Register): Observable<Register> {
    return this.http.post<Register>(`${this.apiURL}api/User`, user, { headers: { 'Content-Type': 'application/json' } });
  }

  //API call for existing user to Login
  //@params:
  // username :string
  // password :string
  signInUser(credentials: { userName: string, password: string }): Observable<UserSignInResponse> {
    return this.http.post<UserSignInResponse>(`${this.apiURL}api/User/login`, credentials);
  }

  //API call for submitting the customer query from customer Service
  //@params:
  //queryData of type CustomerSchema
  submitQuery(queryData: CustomerSchema): Observable<CustomerSchema> {
    return this.http.post<CustomerSchema>(`${this.apiURL}api/CustomerService`, queryData, { headers: { 'Content-Type': 'application/json' } });
  }

  //API call for editing the current user details
  //@params:
  //id: string;
  //userData of type Register;
  editUser(id: string, userData: Register): Observable<Register> {
    return this.http.put<Register>(`${this.apiURL}api/User/${id}`, userData, { headers: { 'Content-Type': 'application/json' } });
  }

  //API call for deleting the account of current user 
  //@params:
  //id: String
  deleteUser(id: string): Observable<Register> {
    return this.http.delete<Register>(`${this.apiURL}api/User/${id}`);
  }

}
