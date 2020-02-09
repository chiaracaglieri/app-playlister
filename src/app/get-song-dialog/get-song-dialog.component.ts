import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SongService } from '../song.service';
import { Song } from '../shared/model/Song';

@Component({
  selector: 'app-get-song-dialog',
  templateUrl: './get-song-dialog.component.html',
  styleUrls: ['./get-song-dialog.component.css']
})
export class GetSongDialogComponent {
  getSongForm: FormGroup;
  editSongForm: FormGroup;
  editingEnabled = false;
  loadedSong: Song;
  errorMessage: string;
  loading = false;

  track_name = new FormControl({ value: ''});
  artist_name = new FormControl({ value: ''});
  track_id = new FormControl({ value: '' });
  genre = new FormControl({ value: ''});
  acousticness = new FormControl({ value: '', validators: [Validators.required, Validators.min(0), Validators.max(1)]});
  danceability = new FormControl({ value: '', validators: [Validators.required, Validators.min(0), Validators.max(1)]});
  duration_ms = new FormControl({ value: ''});
  energy = new FormControl({ value: '', validators: [Validators.required, Validators.min(0), Validators.max(1)] });
  instrumentalness = new FormControl({ value: '', validators: [Validators.required, Validators.min(0), Validators.max(1)]});
  liveness = new FormControl({ value: '',  validators: [Validators.required, Validators.min(0), Validators.max(1)]});
  loudness = new FormControl({ value: '', validators: [Validators.required, Validators.min(-100), Validators.max(100)]});
  speechiness = new FormControl({ value: '',  validators: [Validators.required, Validators.min(0), Validators.max(1)] });
  tempo = new FormControl({ value: '',  validators: [Validators.required, Validators.min(0), Validators.max(300)] });
  valence = new FormControl({ value: '', validators: [Validators.required, Validators.min(0), Validators.max(1)]});

  constructor(private formBuilder: FormBuilder, public songService: SongService) {
    this.getSongForm = this.formBuilder.group({
      track_name: '',
      artist_name: '',
      track_id: ''
    });

    this.editSongForm = this.formBuilder.group({
      track_name: this.track_name,
      artist_name: this.artist_name,
      track_id: this.track_id,
      genre: this.genre,
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

  onSubmit(getSongData: FormGroup) {
    this.loading=true;
      this.songService.getSong(getSongData.get("track_id").value, getSongData.get("track_name").value, getSongData.get("artist_name").value).subscribe(
        (response) => {
            let json: JSON = response.body;
            this.loadedSong = json["data"];
            this.loading=false;
            this.errorMessage=null;
        },
        (error) => {
          let json: JSON = error.error;
          this.errorMessage = json['message'];
          this.loading=false;
        }
      );
  }

  onSubmitEdit(editSongData: FormGroup) {
    this.loading=true;
    let song: Song = new Song();
    song.track_name = editSongData.get("track_name").value;
    song.artist_name = editSongData.get("artist_name").value;
    song.track_id = editSongData.get("track_id").value;
    song.duration_ms = editSongData.get("duration_ms").value;
    song.genre=editSongData.get("genre").value;
    song.acousticness = editSongData.get("acousticness").value;
    song.danceability = editSongData.get("danceability").value;
    song.energy = editSongData.get("energy").value;
    song.instrumentalness = editSongData.get("instrumentalness").value;
    song.liveness = editSongData.get("liveness").value;
    song.loudness = editSongData.get("loudness").value;
    song.speechiness = editSongData.get("speechiness").value;
    song.tempo = editSongData.get("tempo").value;
    song.valence = editSongData.get("valence").value;

    this.songService.updateSong(song).subscribe(
      (response) => {
          this.loadedSong = song;
          this.loading=false;
      },
      (error) =>{
        this.loading=false;
      }
    );
  }

}
