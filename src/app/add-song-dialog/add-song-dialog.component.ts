import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-song-dialog',
  templateUrl: './add-song-dialog.component.html',
  styleUrls: ['./add-song-dialog.component.css']
})
export class AddSongDialogComponent implements OnInit {
  addSongForm: FormGroup;
  genres= ["Pop"];
  constructor(private formBuilder: FormBuilder) {
    this.addSongForm = this.formBuilder.group({
      track_name: '',
      artist_name: '',
      duration_ms: '',
      genre: '',
      acousticness: '',
      danceability: '',
      energy: '',
      instrumentalness: '',
      liveness: '',
      loudness: '',
      speechiness: '',
      tempo: '',
      valence: ''
    });
   }

  ngOnInit() {
  }

}
