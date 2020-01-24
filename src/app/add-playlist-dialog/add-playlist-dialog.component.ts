import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-add-playlist-dialog',
  templateUrl: './add-playlist-dialog.component.html',
  styleUrls: ['./add-playlist-dialog.component.css']
})
export class AddPlaylistDialogComponent implements OnInit {
  addPlaylistForm: FormGroup ;

  constructor(private router: Router,private formBuilder: FormBuilder, private playlistService: PlaylistService) { 
    this.addPlaylistForm = this.formBuilder.group({
      name: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(addPlaylistData: FormGroup ){
    
    this.playlistService.createPlaylist(addPlaylistData.get("name").value).subscribe(
      (response) => {
        console.log(response);
      }
    );

  }
}
