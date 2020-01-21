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

  constructor(private router: Router) { }

  toggleDrawer() {
    this.opened = !this.opened;
  }
  ngOnInit() {
  }

}
