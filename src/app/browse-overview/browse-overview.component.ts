import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SongService } from '../song.service';
import { Song } from '../shared/model/Song';
import { SongDetailDialogComponent } from '../song-detail-dialog/song-detail-dialog.component';
import { MatDialog } from '@angular/material';
import { UserService } from '../user.service';

@Component({
  selector: 'app-browse-overview',
  templateUrl: './browse-overview.component.html',
  styleUrls: ['./browse-overview.component.css']
})
export class BrowseOverviewComponent implements OnInit {

  searchSongForm: FormGroup ;
  exploreSongsList: Song[];
  suggestedSongsList: Song[];
  loading=false;
  showSearchError = false;
  loadedSongs: Song[];

  constructor(private formBuilder: FormBuilder, public songService: SongService,
    public dialog: MatDialog, public userService: UserService) { 
      this.loading=true;

    this.searchSongForm = this.formBuilder.group({
        track_name: '',
        artist_name: '',
        genre: ''
      });
    this.songService.getSongsSuggestions(10,20).subscribe(
      (response) => {
        let json: JSON = response.body;
        this.suggestedSongsList = json['data'];
        this.refreshExploreSongs();
        this.loading=false;
      }
    );

    

  }

  ngOnInit() {
  }

  refreshExploreSongs(){
    this.loading=true;
    this.songService.getRandomSongs(10).subscribe(
      (response) => {
          let json: JSON = response.body;
          this.exploreSongsList = json['data'];
          this.loading=false;
      }
    );
  }

  openSongDetailDialog(song: Song){
    const dialogRef = this.dialog.open(SongDetailDialogComponent, {
      width: '400px',
      data: {
        song: song
      }
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
        },
        (error) => {
          this.showSearchError = true;
        }
      );
  }

  eraseSongList(){
    this.loadedSongs = null;
  }

}
