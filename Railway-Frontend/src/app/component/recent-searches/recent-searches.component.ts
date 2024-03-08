import { Component, OnInit } from '@angular/core';
import { TrainService } from 'src/app/services/trainService/train.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss']
})
export class RecentSearchesComponent implements OnInit{

  //variable to store the recentSearches
  recentSearches:string[];

  constructor(private trainService:TrainService){}

  ngOnInit(): void {
    this.recentSearches=this.trainService.getRecentHistory();
  }
}
