import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';
import { Playlist } from '../shared/model/Playlist';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SongService } from '../song.service';
import { Song } from '../shared/model/Song';
import { User } from '../shared/model/User';
import { UserService } from '../user.service';


@Component({
  selector: 'app-add-song-to-playlist-dialog',
  templateUrl: './add-song-to-playlist-dialog.component.html',
  styleUrls: ['./add-song-to-playlist-dialog.component.css']
})
export class AddSongToPlaylistDialogComponent implements OnInit {

  displayedColumns: string[] = ['Song', 'Artist', 'Genre', 'Duration', 'Symbol'];
  SONG_DATA: Song[];
  dataSource;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
  }
  
  playlist: Playlist;
  showSearchError = false;

  loadedSongs: Song[];
  
  genres= [	"A Capella",
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

  addSongForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    private songService: SongService, private userService: UserService) {
    this.playlist = data.playlist;
    this.addSongForm = this.formBuilder.group({
      track_name: '',
      artist_name: '',
      genre: ''
    });
  }


  onSubmit(addSongData: FormGroup){
    console.log(addSongData);
    if(addSongData.get("track_name").value=="" &&
      addSongData.get("artist_name").value=="" &&
      addSongData.get("genre").value==""){
        this.showSearchError = true;
      }
    this.songService.getSongs( (addSongData.get("artist_name").value==""? null: addSongData.get("artist_name").value),
    (addSongData.get("track_name").value=="" ? null: addSongData.get("track_name").value),
    (addSongData.get("genre").value=="" ? null: addSongData.get("genre").value) ).subscribe(
        (response) => {
          let json: JSON = response.body;
          this.loadedSongs = json["data"];
          this.SONG_DATA = this.loadedSongs;
          this.dataSource = new MatTableDataSource(this.SONG_DATA);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.showSearchError = true;
        }
      );
  }

  millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000);
    var seconds: Number = new Number(((millis % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  addToPlaylist(song: Song){
    this.songService.addToPlaylist(song, this.playlist.name).subscribe(
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
    );
  }
}