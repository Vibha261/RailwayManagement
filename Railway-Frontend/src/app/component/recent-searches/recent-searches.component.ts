import { Component, OnInit } from '@angular/core';
import { TrainService } from 'src/app/services/trainService/train.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss']
})
export class RecentSearchesComponent implements OnInit{

  constructor(private trainService:TrainService){}
  recentSearches:string[];

  ngOnInit(): void {
    this.recentSearches=this.trainService.getRecentHistory();
  }

}
