import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SongService } from '../song.service';
import { Song } from '../shared/model/Song';

@Component({
  selector: 'app-delete-song-dialog',
  templateUrl: './delete-song-dialog.component.html',
  styleUrls: ['./delete-song-dialog.component.css']
})
export class DeleteSongDialogComponent implements OnInit {
  getSongForm: FormGroup;
  deleteSongForm: FormGroup;
  loadedSong: Song;

  track_name = new FormControl({ value: '', disabled: true });
  artist_name = new FormControl({ value: '', disabled: true });
  track_id = new FormControl({ value: '', disabled: true });
  acousticness = new FormControl({ value: '', disabled: true });
  danceability = new FormControl({ value: '', disabled: true });
  duration_ms = new FormControl({ value: '', disabled: true });
  energy = new FormControl({ value: '', disabled: true });
  instrumentalness = new FormControl({ value: '', disabled: true });
  liveness = new FormControl({ value: '', disabled: true });
  loudness = new FormControl({ value: '', disabled: true });
  speechiness = new FormControl({ value: '', disabled: true });
  tempo = new FormControl({ value: '', disabled: true });
  valence = new FormControl({ value: '', disabled: true });

  constructor(private formBuilder: FormBuilder, private songService: SongService) { 
    this.getSongForm = this.formBuilder.group({
      track_name: '',
      artist_name: '',
      track_id: ''
    });

    this.deleteSongForm = this.formBuilder.group({
      track_name: this.track_name,
      artist_name: this.artist_name,
      track_id: this.track_id,
      acousticness: this.acousticness,
      danceability: this.danceability,
      duration_ms: this.duration_ms,
      energy: this.energy,
      instrumentalness: this.instrumentalness,
      liveness: this.liveness,
      loudness: this.loudness,
      speechiness: this.speechiness,
      tempo: this.tempo,
      valence: this.valence
    });
  }

  ngOnInit() {
  }

  onSubmit(getSongData: FormGroup){
    this.songService.getSong( getSongData.get("track_id").value, getSongData.get("track_name").value,getSongData.get("artist_name").value).subscribe(
        (response) => {
          if(response.status === 200){
            let json: JSON = response.body;
            this.loadedSong = json["data"];
          } else {

          }
        }
      );
  }

  onSubmitDelete(deleteSongData: FormGroup){
    this.songService.deleteSong(deleteSongData.get("track_id").value).subscribe(
        (response) => {
          if(response.status === 200){
            let json: JSON = response.body;
          } else {

          }
        }
      );
  }


}
