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
export class PlaylistService {

  isPlaylistOverview= true;
  selectedPlaylistName: string;
  SONG_DATA: Song[];
  dataSource;
  
  baseUrl = "https://playlister-project.herokuapp.com/";
  constructor(private http: HttpClient, private userService: UserService) { 
    
  }

  getPlaylists(): Playlist[]{
    return this.userService.loggedUser.playlists;
  }

  createPlaylist(name: string){
    let request = this.baseUrl + "playlistManager/createPlaylist?email=" + this.userService.loggedUser.email + "&playlistName=" + name;
    console.log(headers);
    
    return this.http.post(request, null,{headers: headers, observe: 'response'});
  }

  deletePlaylist(name: string) {
    let request = this.baseUrl + "playlistManager/deletePlaylist?email="+this.userService.loggedUser.email+"&playlistName="+ name;
    return this.http.delete<JSON>(request, {headers: headers, observe: 'response'});
  }

  updatePlaylist(oldName: string, newName: string){
    let request = this.baseUrl + "playlistManager/updatePlaylist?email="+this.userService.loggedUser.email+"&playlistNewName="+ newName +"&playlistOldName="+oldName;
    return this.http.put<JSON>(request, null, {headers: headers, observe: 'response'});
  }

  getMostPopularArtist(){
    let request = this.baseUrl + "playlistManager/getMostPopularArtist?email=" + this.userService.loggedUser.email;
    return this.http.get<JSON>(request, {headers: headers, observe: 'response'});
  }

  getTopArtists(limit: number, minBirthday: string, maxBirthday: string, gender: string, region: string){
    let request = this.baseUrl + "playlistManager/getTopArtists?limit=" + limit;
    if(minBirthday!=null && minBirthday.length>0){
      request= request+ "&minBirthday=" + minBirthday;
    }
    if(maxBirthday!=null && maxBirthday.length>0){
      request= request+ "&maxBirthday=" + maxBirthday;
    }
    if(gender!=null && gender.length>0){
      request= request+ "&gender=" + gender;
    }
    if(region!= null && region.length>0){
      request= request+ "&region=" + region;
    }
    return this.http.get<JSON>(request, {headers: headers, observe: 'response'});
  }

  getTopSongs(limit: number, minBirthday: string, maxBirthday: string, gender: string, region: string){
    let request = this.baseUrl + "playlistManager/getTopSongs?limit=" + limit;
    if(minBirthday!=null && minBirthday.length>0){
      request= request+ "&minBirthday=" + minBirthday;
    }
    if(maxBirthday!=null && maxBirthday.length>0){
      request= request+ "&maxBirthday=" + maxBirthday;
    }
    if(gender!=null && gender.length>0){
      request= request+ "&gender=" + gender;
    }
    if(region!= null && region.length>0){
      request= request+ "&region=" + region;
    }
    return this.http.get<JSON>(request, {headers: headers, observe: 'response'});
  }

  getTopGenres(limit: number, minBirthday: string, maxBirthday: string, gender: string, region: string){
    let request = this.baseUrl + "playlistManager/getTopGenres?limit=" + limit;
    if(minBirthday!=null && minBirthday.length>0){
      request= request+ "&minBirthday=" + minBirthday;
    }
    if(maxBirthday!=null && maxBirthday.length>0){
      request= request+ "&maxBirthday=" + maxBirthday;
    }
    if(gender!=null && gender.length>0){
      request= request+ "&gender=" + gender;
    }
    if(region!= null && region.length>0){
      request= request+ "&region=" + region;
    }
    return this.http.get<JSON>(request, {headers: headers, observe: 'response'});
  }
}