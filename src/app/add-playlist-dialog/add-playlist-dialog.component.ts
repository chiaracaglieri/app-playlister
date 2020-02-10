import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-add-playlist-dialog',
  templateUrl: './add-playlist-dialog.component.html',
  styleUrls: ['./add-playlist-dialog.component.css']
})
export class AddPlaylistDialogComponent{
  addPlaylistForm: FormGroup;
  playlistCreated = false;

  errorMessage: string;
  loading = false;
  
  constructor(private formBuilder: FormBuilder, private playlistService: PlaylistService, private userService: UserService) { 
    this.addPlaylistForm = this.formBuilder.group({
      name: ''
    });
  }

  onSubmit(addPlaylistData: FormGroup ){
    this.loading = true;

    this.playlistService.createPlaylist(addPlaylistData.get("name").value).subscribe(
      (response) => {
        this.userService.getUser(this.userService.loggedUser.email).subscribe(
          (response) => {
              let json: JSON = response.body;
              this.userService.loggedUser = json['data'];
          }
         );
         this.loading=false;
         this.playlistCreated=true;
      },
      (error) => {
        let json: JSON = error.error;
        this.errorMessage = json['message'];
        this.loading=false;
      }
    );

  }
}
