import { Component, OnInit, Input, Inject } from '@angular/core';
import { Playlist } from '../shared/model/Playlist';
import {MAT_DIALOG_DATA} from '@angular/material'
import { PlaylistService } from '../playlist.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-playlist-alert',
  templateUrl: './delete-playlist-alert.component.html',
  styleUrls: ['./delete-playlist-alert.component.css']
})
export class DeletePlaylistAlertComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private playlistService: PlaylistService, private userService: UserService,
  private router: Router) { 
  }

  ngOnInit() {
  }

  deletePlaylist(){
    this.playlistService.deletePlaylist(this.data.playlist.name).subscribe(
      (response) => {
        if(response.status===200){
          this.userService.getUser(this.userService.loggedUser.email).subscribe(
            (response) => {
              if(response.status === 200){
                let json: JSON = response.body;
                this.userService.loggedUser = json['data'];
                this.playlistService.isPlaylistOverview = true;
              }
              else{
      
              }
            }
           );
        }
      }
    );
  }

}
