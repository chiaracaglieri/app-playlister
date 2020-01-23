import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  events: string[] = [];
  opened: boolean = false;
  activeTab = 1;
  constructor(private router: Router) { }

  toggleDrawer() {
    this.opened = !this.opened;
  }
  ngOnInit() {
  }

  setActiveTab(num: number){
    this.activeTab = num;
  }

}
