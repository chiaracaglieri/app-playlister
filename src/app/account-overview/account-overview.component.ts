import { Component} from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EditAccountDialogComponent } from '../edit-account-dialog/edit-account-dialog.component';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { DeleteAccountAlertComponent } from '../delete-account-alert/delete-account-alert.component';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css']
})
export class AccountOverviewComponent{

  constructor(public userService: UserService, public playlistService: PlaylistService,private router: Router, public dialog: MatDialog) { 
  }

  logOut(){
    this.userService.loggedUser=null;
    this.playlistService.selectedPlaylistName= null;
    this.playlistService.dataSource=null;
    this.playlistService.isPlaylistOverview=true;
    this.playlistService.SONG_DATA=null;
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
