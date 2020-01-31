import { Component, OnInit, Input, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
import { Playlist } from '../shared/model/Playlist';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Song } from '../shared/model/Song';
import { MatDialog } from '@angular/material';
import { DeletePlaylistAlertComponent } from '../delete-playlist-alert/delete-playlist-alert.component';
import { EditPlaylistDialogComponent } from '../edit-playlist-dialog/edit-playlist-dialog.component';
import { PlaylistService } from '../playlist.service';
import { AddSongToPlaylistDialogComponent } from '../add-song-to-playlist-dialog/add-song-to-playlist-dialog.component';
import { SongService } from '../song.service';
import { UserService } from '../user.service';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }



@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {
  @Input() playlist: Playlist = new Playlist();
  SONG_DATA: Song[];
  displayedColumns: string[] = ['Song', 'Artist', 'Duration', 'Delete'];
  dataSource;

  constructor(private router: Router, public dialog: MatDialog, public playlistService: PlaylistService,
    public songService: SongService, public userService: UserService) {

  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.SONG_DATA = this.playlist.songs;
    this.dataSource = new MatTableDataSource(this.SONG_DATA);
  }

  millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000);
    var seconds: Number = new Number(((millis % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  goBack() {
    this.playlistService.isPlaylistOverview = true;
  }

  openDeletePlaylistAlert() {
    const dialogRef = this.dialog.open(DeletePlaylistAlertComponent, {
      width: '400px',
      data: {
        playlist: this.playlist
      }
    });
  }

  openEditPlaylistDialog() {
    const dialogRef = this.dialog.open(EditPlaylistDialogComponent, {
      width: '400px',
      data: {
        playlist: this.playlist
      }
    });
  }

  openAddSongToPlaylistDialog() {
    const dialogRef = this.dialog.open(AddSongToPlaylistDialogComponent, {
      width: '900px',
      height: '600px',
      data: {
        playlist: this.playlist
      }
    });
  }

  deleteFromPlaylist(trackId: string) {
    this.songService.deleteSongFromPlaylist(this.playlist.name, trackId).subscribe(
      (response) => {
        this.userService.getUser(this.userService.loggedUser.email).subscribe(
          (response) => {
            let json: JSON = response.body;
            this.userService.loggedUser = json['data'];
            let name = this.playlist.name;
            this.SONG_DATA = this.userService.loggedUser.playlists.filter(function(p) {
              return p.name === name;
            })[0].songs;
            this.dataSource = new MatTableDataSource(this.SONG_DATA);
          }
        );
      }
    );
  }
}
