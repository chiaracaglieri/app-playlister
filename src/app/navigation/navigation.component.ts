import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  events: string[] = [];
  opened: boolean = false;

  activeTab = 3;
  constructor(private router: Router, public userService: UserService) {
    if(userService.loggedUser.role==='ADMIN'){
      this.activeTab=5;
    } else if (this.userService.loggedUser.role==='SUPERUSER'){
      this.activeTab=4;
    }
   }

  toggleDrawer() {
    this.opened = !this.opened;
  }
  ngOnInit() {
  }

  setActiveTab(num: number){
    this.activeTab = num;
  }

}
