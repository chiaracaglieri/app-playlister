import { Injectable } from '@angular/core';
import { User } from './shared/model/User';
import { Playlist } from './shared/model/Playlist';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Song } from './shared/model/Song';

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

  deletePlaylist(name: string) {
    let request = this.baseUrl + "playlistManager/deletePlaylist?email="+this.userService.loggedUser.email+"&playlistName="+ name;
    return this.http.delete<JSON>(request, {observe: 'response'});
  }

  updatePlaylist(newName: string, oldName: string){
    let request = this.baseUrl + "playlistManager/updatePlaylist?email="+this.userService.loggedUser.email+"&playlistNewName="+ newName +"&playlistOldName="+oldName;
    return this.http.put<JSON>(request, {observe: 'response'});
  }

  getMostPopularArtist(){
    let request = this.baseUrl + "playlistManager/getMostPopularArtist?email=" + this.userService.loggedUser.email;
    return this.http.get<JSON>(request, {observe: 'response'});
  }
}