import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SongService } from '../song.service';
import { Song } from '../shared/model/Song';

@Component({
  selector: 'app-add-song-dialog',
  templateUrl: './add-song-dialog.component.html',
  styleUrls: ['./add-song-dialog.component.css']
})
export class AddSongDialogComponent implements OnInit {
  errorMessage: string;
  loading = false;
  insertedSong: Song;

  addSongForm: FormGroup;
  genres= [	null,"A Capella",
	"Alternative",
	"Anime",
	"Blues",
	"Children's Music",
	"Children’s Music",
	"Classical",
	"Comedy",
	"Country",
	"Dance",
	"Electronic",
	"Folk",
	"Hip-Hop",
	"Indie",
	"Jazz",
	"Movie",
	"Opera",
	"Pop",
	"R&B",
	"Rap",
	"Reggae",
	"Reggaeton",
	"Rock",
	"Ska",
	"Soul",
	"Soundtrack",
  "World"];
  
  acousticness = new FormControl('', [Validators.required, Validators.min(0), Validators.max(1)]);
  danceability = new FormControl('', [Validators.required, Validators.min(0), Validators.max(1)]);
  energy = new FormControl('', [Validators.required, Validators.min(0), Validators.max(1)]);
  instrumentalness = new FormControl('', [Validators.required, Validators.min(0), Validators.max(1)]);
  liveness = new FormControl('', [Validators.required, Validators.min(0), Validators.max(1)]);
  loudness = new FormControl('', [Validators.required, Validators.min(-100), Validators.max(100)]);
  speechiness = new FormControl('', [Validators.required, Validators.min(0), Validators.max(1)]);
  tempo = new FormControl('', [Validators.required, Validators.min(0), Validators.max(300)]);
  valence = new FormControl('', [Validators.required, Validators.min(0), Validators.max(1)]);

  constructor(private formBuilder: FormBuilder, private songService: SongService) {
    this.addSongForm = this.formBuilder.group({
      track_name: '',
      artist_name: '',
      duration_ms: '',
      genre: '',
      acousticness: this.acousticness,
      danceability: this.danceability,
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

  onSubmit(addSongData: FormGroup){
    this.loading=true;

    let song: Song = new Song();
    song.track_name=addSongData.get("track_name").value;
    song.artist_name=addSongData.get("artist_name").value;
    song.duration_ms=addSongData.get("duration_ms").value;
    song.genre=addSongData.get("genre").value == "" ? null: addSongData.get("genre").value;
    song.acousticness=addSongData.get("acousticness").value;
    song.danceability=addSongData.get("danceability").value;
    song.energy=addSongData.get("energy").value;
    song.instrumentalness=addSongData.get("instrumentalness").value;
    song.liveness=addSongData.get("liveness").value;
    song.loudness=addSongData.get("loudness").value;
    song.speechiness=addSongData.get("speechiness").value;
    song.tempo=addSongData.get("tempo").value;
    song.valence=addSongData.get("valence").value;

    this.songService.createSong(song).subscribe(
        (response) => {
            let json: JSON = response.body;
            this.insertedSong = json['data'];
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
}
