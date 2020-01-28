import { Injectable } from '@angular/core';
import { User } from './shared/model/User';
import { Playlist } from './shared/model/Playlist';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Song } from './shared/model/Song';

@Injectable({
  providedIn: 'root',
})
export class SongService {

  baseUrl = "https://playlister-project.herokuapp.com/";
  constructor(private http: HttpClient, private userService: UserService) { }

  createSong(song: Song){
    let request = this.baseUrl + "songManager/createSong";
    return this.http.post<JSON>(request, song, {observe: 'response'});
  }

  getSong(track_id: string, track_name: string, artist_name: string){
    let request = this.baseUrl + "songManager/getSong?artistName="+ artist_name +"&trackId="+ track_id +"&trackName="+ track_name;
    return this.http.get<JSON>(request, {observe: 'response'});
  }

  getRandomSongs(limit: number){
    let request = this.baseUrl + "songManager/getRandomSongs?limit=" + limit;
    return this.http.get<JSON>(request, {observe: 'response'});
  }

  getSongsSuggestions(limit: number, threshold: number){
    let request = this.baseUrl + "songManager/getSongsSuggestions?limit=" + limit+"&threshold="+threshold;
    return this.http.post<JSON>(request, this.userService.loggedUser, {observe: 'response'});
  }

  addToPlaylist(song: Song, name: string){
    let request = this.baseUrl + "songManager/addSongToPlaylist?email="+this.userService.loggedUser.email+"&playlistName="+ name+"&trackId="+song.track_id;
    return this.http.put<JSON>(request, {observe: 'response'});
  }
  // getPlaylists(): Playlist[]{
  //   return this.userService.loggedUser.playlists;
  // }

  // createPlaylist(name: string){
  //   let request = this.baseUrl + "playlistManager/createPlaylist?email=" + this.userService.loggedUser.email + "&playlistName=" + name;
  //   return this.http.post(request, {observe: 'response'});
  // }

  // getMostPopularArtist(){
  //   let request = this.baseUrl + "playlistManager/getMostPopularArtist?email=" + this.userService.loggedUser.email;
  //   return this.http.get<JSON>(request, {observe: 'response'});
  // }
}