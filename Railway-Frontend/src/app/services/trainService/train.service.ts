import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingTrainSchema } from 'src/app/shared/models/bookingTrainSchema';
import { Cancelled } from 'src/app/shared/models/cancelled';
import { Diverted } from 'src/app/shared/models/diverted';
import { Seats } from 'src/app/shared/models/seatAvailabity';
import { Station } from 'src/app/shared/models/stationSchema';
import { TrainOnStation } from 'src/app/shared/models/trainOnStation';
import { Train } from 'src/app/shared/models/trainSchema';
import { UserAuthenticateService } from '../userService/user-authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  //URL for backend connection
  private apiURL = 'https://localhost:7226';

  //variable to store the Recent History
  private recentHistory: string[] = [];

  constructor(private http: HttpClient, private auth: UserAuthenticateService) {
  }

  //fetching the train schedule data
  //@params:
  //trainNumber: string
  getTrainsByTrainNumber(trainNumber: string): Observable<Train[]> {
    return this.http.get<Train[]>(`${this.apiURL}/api/TrainSchedule/${trainNumber}`);
  }

  //fetching the cancelled train data 
  getCancelledTrainsData(): Observable<Cancelled[]> {
    return this.http.get<Cancelled[]>(`${this.apiURL}/api/CancelledTrain`);
  }

  //fetching the diverted train data
  getDivertedTrainsData(): Observable<Diverted[]> {
    return this.http.get<Diverted[]>(`${this.apiURL}/api/DivertedTrain`);
  }

  //fetching the trains data arrived on the particular station
  //@params:
  //sattionCode: string
  getTrainsOnStation(stationCode: string): Observable<TrainOnStation[]> {
    return this.http.get<TrainOnStation[]>(`${this.apiURL}/api/TrainSchedule/station/${stationCode}`);
  }

  //fetching the seats info of a particular train
  //@params:
  //trainNumber:string
  //date:string
  getSeatsInfoInTrain(trainNumber: string, date: string): Observable<Seats> {
    return this.http.get<Seats>(`${this.apiURL}/api/TrainSchedule/trainSeatInfo/${trainNumber}/${date}`);
  }

  //fetching the predicted arrival train data
  //@params:
  //trainNumber:string
  //stationCode: string
  getPredictedTime(trainNumber: string, stationCode: string): Observable<TrainOnStation> {
    return this.http.get<TrainOnStation>(`${this.apiURL}/api/TrainSchedule/arrivalTimePredictor/${trainNumber}/${stationCode}`);
  }

  //fetch the data of trains between the stations
  //@params:
  //from:string
  //to:string
  getTrainsBetweenStations(from: string, to: string): Observable<BookingTrainSchema[]> {
    return this.http.get<BookingTrainSchema[]>(`${this.apiURL}/api/TrainSchedule/${from}/${to}`);
  }

  recentHistoryOneParam(search: string): void {
    if (this.auth.isUserLoggedIn()) {
      const parameters = `${search}`;
      this.recentHistory.push(parameters);
      console.log('Call parameters stored:', parameters);
    } else {
      console.log('User is not logged in. Call parameters not stored.');
    }
  }

  recentHistoryTwoParam(search1: string, search2: string): void {
    if (this.auth.isUserLoggedIn()) {
      const parameters = `${search1} - ${search2}`;
      this.recentHistory.push(parameters);
      console.log('Call parameters stored:', parameters);
    } 
  }

  setRecentHistory():void{
    this.recentHistory=[];
  }
  getRecentHistory():string[]{
    return this.recentHistory;
  }
}
