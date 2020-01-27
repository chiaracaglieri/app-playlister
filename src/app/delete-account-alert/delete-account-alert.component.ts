import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account-alert',
  templateUrl: './delete-account-alert.component.html',
  styleUrls: ['./delete-account-alert.component.css']
})
export class DeleteAccountAlertComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  deleteAccount(){
    this.userService.deleteUser().subscribe(
      (response) => {
        if(response.status===200){
          this.userService.loggedUser=null;
          this.router.navigateByUrl('/login');
        }
      }
    );
  }
}
