import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SongService } from '../song.service';
import { Song } from '../shared/model/Song';

@Component({
  selector: 'app-get-song-dialog',
  templateUrl: './get-song-dialog.component.html',
  styleUrls: ['./get-song-dialog.component.css']
})
export class GetSongDialogComponent implements OnInit {
  getSongForm: FormGroup;
  editSongForm: FormGroup;
  editingEnabled=false;
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

    this.editSongForm = this.formBuilder.group({
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

  onSubmitEdit(editSongData: FormGroup){
    console.log(editSongData);
    let song: Song = new Song();

    song.track_name=editSongData.get("track_name").value;
    song.artist_name=editSongData.get("artist_name").value;
    song.track_id=editSongData.get("track_id").value;
    song.duration_ms=editSongData.get("duration_ms").value;
    //song.genre=editSongData.get("genre").value;
    song.acousticness=editSongData.get("acousticness").value;
    song.danceability=editSongData.get("danceability").value;
    song.energy=editSongData.get("energy").value;
    song.instrumentalness=editSongData.get("instrumentalness").value;
    song.liveness=editSongData.get("liveness").value;
    song.loudness=editSongData.get("loudness").value;
    song.speechiness=editSongData.get("speechiness").value;
    song.tempo=editSongData.get("tempo").value;
    song.valence=editSongData.get("valence").value;

    this.songService.updateSong(song).subscribe(
        (response) => {
          if(response.status === 200){
            this.loadedSong=song;
            this.disableEditing();
          } else {

          }
        }
      );
  }

  enableEditing(){
    this.editingEnabled=true;
    this.track_name.enable();
    this.artist_name.enable();
    this.acousticness.enable();
    this.danceability.enable();
    this.duration_ms.enable();
    this.energy.enable();
    this.instrumentalness.enable();
    this.liveness.enable();
    this.loudness.enable();
    this.speechiness.enable();
    this.tempo.enable();
    this.valence.enable();

  }

  disableEditing(){
    this.editingEnabled=false;
    this.track_name.disable();
    this.artist_name.disable();
    this.acousticness.disable();
    this.danceability.disable();
    this.duration_ms.disable();
    this.energy.disable();
    this.instrumentalness.disable();
    this.liveness.disable();
    this.loudness.disable();
    this.speechiness.disable();
    this.tempo.disable();
    this.valence.disable();

  }

}
