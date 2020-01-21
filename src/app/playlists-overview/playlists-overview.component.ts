import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Playlist } from '../shared/model/Playlist';

@Component({
  selector: 'app-playlists-overview',
  templateUrl: './playlists-overview.component.html',
  styleUrls: ['./playlists-overview.component.css']
})
export class PlaylistsOverviewComponent implements OnInit {
  userPlaylists: Playlist[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userPlaylists = this.userService.getPlaylists();
  }

}
