import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material'
import { UserService } from '../user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PlaylistService } from '../playlist.service';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-detail-dialog',
  templateUrl: './song-detail-dialog.component.html',
  styleUrls: ['./song-detail-dialog.component.css']
})
export class SongDetailDialogComponent implements OnInit {
  addToPlaylistForm: FormGroup ;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, public userService: UserService, public songService: SongService ) { 
    this.addToPlaylistForm = this.formBuilder.group({
      playlist: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(addToPlaylistForm: FormGroup){
    this.songService.addToPlaylist(this.data.song, addToPlaylistForm.get("playlist").value).subscribe(
      (response)=>{
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
      }
    )
  }

}
