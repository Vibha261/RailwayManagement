import { Component } from '@angular/core';
import { Register } from '../../models/registerUserSchema';
import { UserService } from 'src/app/services/userService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  currentUser:Register;

  constructor(private userService:UserService, private router: Router){}

}
