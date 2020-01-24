import { Injectable } from '@angular/core';
import { User } from './shared/model/User';
import { Playlist } from './shared/model/Playlist';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {

  baseUrl = "https://playlister-project.herokuapp.com/";
  constructor(private http: HttpClient, private userService: UserService) { }

  getPlaylists(): Playlist[]{
    return this.userService.loggedUser.playlists;
  }

  createPlaylist(name: string){
    let request = this.baseUrl + "playlistManager/createPlaylist?email=" + this.userService.loggedUser.email + "&playlistName=" + name;
    return this.http.post(request, {observe: 'response'});
  }
}