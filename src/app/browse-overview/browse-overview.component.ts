import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SongService } from '../song.service';
import { Song } from '../shared/model/Song';
import { SongDetailDialogComponent } from '../song-detail-dialog/song-detail-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-browse-overview',
  templateUrl: './browse-overview.component.html',
  styleUrls: ['./browse-overview.component.css']
})
export class BrowseOverviewComponent implements OnInit {

  searchForm: FormGroup ;
  exploreSongsList: Song[];
  suggestedSongsList: Song[];

  constructor(private formBuilder: FormBuilder, private songService: SongService,
    public dialog: MatDialog) { 
    this.searchForm = this.formBuilder.group({
      search: ''
    });

    this.songService.getSongsSuggestions(10,20).subscribe(
      (response) => {
        if (response.status === 200) {
          let json: JSON = response.body;
          this.suggestedSongsList = json['data'];
        }
        else {

        }
      }
    );

    this.refreshExploreSongs();

  }

  ngOnInit() {
  }

  refreshExploreSongs(){
    this.songService.getRandomSongs(10).subscribe(
      (response) => {
        if (response.status === 200) {
          let json: JSON = response.body;
          this.exploreSongsList = json['data'];
        }
        else {

        }
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

  onEnter(){

  }

}
