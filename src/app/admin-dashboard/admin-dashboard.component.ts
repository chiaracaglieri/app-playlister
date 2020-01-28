import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddSongDialogComponent } from '../add-song-dialog/add-song-dialog.component';
import { GetSongDialogComponent } from '../get-song-dialog/get-song-dialog.component';
import { DeleteSongDialogComponent } from '../delete-song-dialog/delete-song-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { ChangeUserRoleDialogComponent } from '../change-user-role-dialog/change-user-role-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  panelOpenState = false;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openAddSongDialog(){
    const dialogRef = this.dialog.open(AddSongDialogComponent, {
      width: '400px',
      height: '500px'
    });
  }

  openGetSongDialog(){
    const dialogRef = this.dialog.open(GetSongDialogComponent, {
      width: '600px',
      height: '500px'
    });
  }

  openDeleteSongDialog(){
    const dialogRef = this.dialog.open(DeleteSongDialogComponent, {
      width: '600px',
      height: '500px'
    });
  }

  openDeleteUserDialog(){
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '400px',
      height: '500px'
    });
  }

  openChangeUserRoleDialog(){
    const dialogRef = this.dialog.open(ChangeUserRoleDialogComponent, {
      width: '400px',
      height: '500px'
    });
  }
}
