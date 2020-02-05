import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material'
import { UserService } from '../user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-detail-dialog',
  templateUrl: './song-detail-dialog.component.html',
  styleUrls: ['./song-detail-dialog.component.css']
})
export class SongDetailDialogComponent implements OnDestroy {
  addToPlaylistForm: FormGroup;
  changed: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, public userService: UserService, public songService: SongService) {
    this.addToPlaylistForm = this.formBuilder.group({
      playlist: ''
    });
  }

  ngOnDestroy() {
    this.changed=false;
  }

  onSubmit(addToPlaylistForm: FormGroup) {
    this.songService.addToPlaylist(this.data.song, addToPlaylistForm.get("playlist").value).subscribe(
      (response) => {
        this.userService.getUser(this.userService.loggedUser.email).subscribe(
          (response) => {
            let json: JSON = response.body;
            this.userService.loggedUser = json['data'];
            this.changed=true;
          }
        );
      }
    )
  }

}
