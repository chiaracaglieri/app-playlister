import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
    if(this.userService.loggedUser == null){
      this.router.navigateByUrl('/login');
    } else if(this.userService.loggedUser.role === "ADMIN"){
      console.log("admin");
    }
   }

  ngOnInit() {
  }

}
