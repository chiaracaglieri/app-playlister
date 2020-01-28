import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-get-song-dialog',
  templateUrl: './get-song-dialog.component.html',
  styleUrls: ['./get-song-dialog.component.css']
})
export class GetSongDialogComponent implements OnInit {
  getSongForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { 
    this.getSongForm = this.formBuilder.group({
      track_name: '',
      artist_name: '',
      track_id: ''
    });
  }

  ngOnInit() {
  }

}
