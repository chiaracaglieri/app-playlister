import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EditAccountDialogComponent } from '../edit-account-dialog/edit-account-dialog.component';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { DeleteAccountAlertComponent } from '../delete-account-alert/delete-account-alert.component';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css']
})
export class AccountOverviewComponent implements OnInit {

  constructor(public userService: UserService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }
  logOut(){
    this.userService.loggedUser=null;
    this.router.navigateByUrl('/login');
  }

  openEditAccountDialog(){
    const dialogRef = this.dialog.open(EditAccountDialogComponent, {
      width: '400px'
    });
  }
  openChangePasswordDialog(){
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px'
    });
  }
  openDeleteAccountAlert(){
    const dialogRef = this.dialog.open(DeleteAccountAlertComponent, {
      width: '400px'
    });
  }
  
}
