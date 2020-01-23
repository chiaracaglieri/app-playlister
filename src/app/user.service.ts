import { Injectable } from '@angular/core';
import { User } from './shared/model/User';
import { Playlist } from './shared/model/Playlist';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  mockUser: User;

  baseUrl = "https://playlister-project.herokuapp.com/";
  constructor(private http: HttpClient) { }

  getPlaylists(): Playlist[]{
    return [
      {name: "playlist1"}, {name: "playlist2"}
    ];
  }

  loadUserDetail(email: String, password: String){
    let request = this.baseUrl + "userManager/login?email=" + email + "&password=" + password;
    return this.http.get(request, {observe: 'response'});
  }
}