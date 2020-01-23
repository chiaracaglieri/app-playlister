import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Playlist } from '../shared/model/Playlist';
import { MatDialog } from '@angular/material/dialog';
import { AddPlaylistDialogComponent } from '../add-playlist-dialog/add-playlist-dialog.component';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-playlists-overview',
  templateUrl: './playlists-overview.component.html',
  styleUrls: ['./playlists-overview.component.css']
})
export class PlaylistsOverviewComponent implements OnInit {
  userPlaylists: Playlist[];

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.userPlaylists = this.userService.getPlaylists();
  }

  openAddPlaylistDialog(){
      const dialogRef = this.dialog.open(AddPlaylistDialogComponent, {
        width: '400px'
      });
  }

}
