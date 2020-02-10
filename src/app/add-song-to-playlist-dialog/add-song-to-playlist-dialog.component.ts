import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';
import { Playlist } from '../shared/model/Playlist';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SongService } from '../song.service';
import { Song } from '../shared/model/Song';
import { User } from '../shared/model/User';
import { UserService } from '../user.service';
import { PlaylistService } from '../playlist.service';


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

  loading=false;

  addSongForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    public songService: SongService, public userService: UserService,
    public playlistService: PlaylistService) {
      
    this.playlist = data.playlist;
    this.addSongForm = this.formBuilder.group({
      track_name: '',
      artist_name: '',
      genre: ''
    });
  }


  onSubmit(addSongData: FormGroup){
    this.loading=true;
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
          this.loading=false;
        },
        (error) => {
          this.showSearchError = true;
          this.loading=false;
        }
      );
      
  }

  millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000);
    var seconds: Number = new Number(((millis % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  addToPlaylist(song: Song){
    this.loading=true;
    this.songService.addToPlaylist(song, this.playlist.name).subscribe(
      (response)=>{
        this.userService.getUser(this.userService.loggedUser.email).subscribe(
          (response) => {
              let json: JSON = response.body;
              this.userService.loggedUser = json['data'];
              let name = this.playlist.name;
              this.playlistService.SONG_DATA = this.userService.loggedUser.playlists.filter(function(p) {
              return p.name === name;
            })[0].songs;
            this.playlistService.dataSource = new MatTableDataSource(this.playlistService.SONG_DATA);
            this.loading=false;
          },
          (error) => {
            this.loading=false;
          }
         );
      },
      (error) => {
        this.loading=false;
      }
    );
    
  }

  clearSearchFields(){
      this.addSongForm.reset();
  }

  songNotInPlaylist(song: Song): boolean{
    for(let i in this.playlist.songs){
      if(this.playlist.songs[i].track_id===song.track_id){
        return false;
      }
    }
    return true;
  }

}