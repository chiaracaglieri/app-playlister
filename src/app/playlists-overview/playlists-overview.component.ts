import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Playlist } from '../shared/model/Playlist';
import { MatDialog } from '@angular/material/dialog';
import { AddPlaylistDialogComponent } from '../add-playlist-dialog/add-playlist-dialog.component';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-playlists-overview',
  templateUrl: './playlists-overview.component.html',
  styleUrls: ['./playlists-overview.component.css']
})
export class PlaylistsOverviewComponent implements OnInit {
  loading = false;

  constructor(public userService: UserService, public dialog: MatDialog, public playlistService: PlaylistService) {
    this.loading = true;
    this.playlistService.getMostPopularArtist().subscribe(
      (response) => {
        let json: JSON = response.body;
        this.playlistService.topArtist = json['data'];
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  ngOnInit() {
  }

  openAddPlaylistDialog() {
    const dialogRef = this.dialog.open(AddPlaylistDialogComponent, {
      width: '400px'
    });
  }

  openPlaylistDetail(playlist: Playlist) {
    this.playlistService.isPlaylistOverview = false;
    this.playlistService.selectedPlaylistName=playlist.name;
  }

}
