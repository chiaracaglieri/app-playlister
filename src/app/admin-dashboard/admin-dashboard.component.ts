import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddSongDialogComponent } from '../add-song-dialog/add-song-dialog.component';
import { GetSongDialogComponent } from '../get-song-dialog/get-song-dialog.component';

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
      width: '400px',
      height: '500px'
    });
  }
}
