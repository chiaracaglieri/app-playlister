import { Injectable } from '@angular/core';
import { User } from './shared/model/User';
import { Playlist } from './shared/model/Playlist';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Song } from './shared/model/Song';

const headers = new HttpHeaders({
  authorization : 'Basic ' + btoa('administrator@playlister.com' + ':' + 'password')
});

@Injectable({
  providedIn: 'root',
})
export class SongService {

  baseUrl = "https://playlister-project.herokuapp.com/";
  constructor(private http: HttpClient, private userService: UserService) { }

  createSong(song: Song){
    let request = this.baseUrl + "songManager/createSong";
    return this.http.post<JSON>(request, song, {headers: headers, observe: 'response'});
  }

  updateSong(song: Song){
    let request = this.baseUrl + "songManager/updateSong";
    return this.http.put<JSON>(request, song, {headers: headers, observe: 'response'});
  }

  getSong(track_id: string, track_name: string, artist_name: string){
    let request;
    if(track_id!=null && track_id!=""){
      request = this.baseUrl + "songManager/getSong?trackId="+ track_id;
    }
    else{
      request = this.baseUrl + "songManager/getSong?artistName="+ artist_name +"&trackName="+ track_name;
    }

    return this.http.get<JSON>(request, {headers: headers, observe: 'response'});
  }

  deleteSong(track_id: string){
    let request = this.baseUrl + "songManager/deleteSong?trackId="+ track_id;
    return this.http.delete<JSON>(request, {headers: headers, observe: 'response'});
  }

  getRandomSongs(limit: number){
    let request = this.baseUrl + "songManager/getRandomSongs?limit=" + limit;
    return this.http.get<JSON>(request, {headers: headers, observe: 'response'});
  }

  getSongsSuggestions(limit: number, threshold: number){
    let request = this.baseUrl + "songManager/getSongsSuggestions?limit=" + limit+"&threshold="+threshold;
    return this.http.post<JSON>(request, this.userService.loggedUser, {headers: headers, observe: 'response'});
  }

  getSongs(artistName: string, trackName: string, genre: string){
    let request = this.baseUrl + "songManager/getSongs?";
    if(artistName!=null){
      request = request.concat("artistName="+artistName+"&");
    }
    if(trackName!=null){
      request = request.concat("trackName="+ trackName+"&");
    }
    if(genre!=null){
      request = request.concat("genre="+genre);
    }
    return this.http.get<JSON>(request, {headers: headers, observe: 'response'});
  }

  addToPlaylist(song: Song, name: string){
    let request = this.baseUrl + "songManager/addSongToPlaylist?email="+this.userService.loggedUser.email+"&playlistName="+ name+"&trackId="+song.track_id;
    return this.http.put<JSON>(request, {headers: headers, observe: 'response'});
  }

  deleteSongFromPlaylist(playlist: string, trackId: string){
    let request = this.baseUrl + "songManager/deleteSongFromPlaylist?email="+this.userService.loggedUser.email+"&playlistName="+ playlist+"&trackId="+trackId;
    return this.http.delete<JSON>(request, {headers: headers, observe: 'response'});
  }
}