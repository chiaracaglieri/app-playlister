import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { PlaylistService } from '../playlist.service';
import { Playlist } from '../shared/model/Playlist';
import {MAT_DIALOG_DATA} from '@angular/material'

@Component({
  selector: 'app-edit-playlist-dialog',
  templateUrl: './edit-playlist-dialog.component.html',
  styleUrls: ['./edit-playlist-dialog.component.css']
})
export class EditPlaylistDialogComponent implements OnInit {
  editPlaylistForm: FormGroup ;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private playlistService: PlaylistService, 
    private userService: UserService) {
    this.editPlaylistForm = this.formBuilder.group({
      name: this.data.playlist.name
    });
   }

  ngOnInit() {
  }

  onSubmit(editPlaylistData: FormGroup ){
    console.log(editPlaylistData);
    this.playlistService.updatePlaylist(editPlaylistData.get("name").value, this.data.playlist.name).subscribe(
      (response) => {
        if(response != null){
           this.userService.getUser(this.userService.loggedUser.email).subscribe(
            (response) => {
              if(response.status === 200){
                let json: JSON = response.body;
                this.userService.loggedUser = json['data'];
              }
              else{

              }
            }
           );
        } else {

        }
      }
    );
  }

}
