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
  topArtist: string;
  selectedPlaylist: Playlist = null;
  loading = false;
  constructor(private userService: UserService, public dialog: MatDialog, private playlistService: PlaylistService) {
    this.loading=true;
    this.playlistService.getMostPopularArtist().subscribe(
      (response) => {
          let json: JSON = response.body;
          this.topArtist = json['data'];
      }
    );
    this.loading=false;
  }
  
ngOnInit() {
}

openAddPlaylistDialog(){
  const dialogRef = this.dialog.open(AddPlaylistDialogComponent, {
    width: '400px'
  });
}

openPlaylistDetail(playlist: Playlist){
  this.playlistService.isPlaylistOverview = false;
  this.selectedPlaylist=playlist;
}

}
