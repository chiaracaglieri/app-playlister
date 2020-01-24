import { Injectable } from '@angular/core';
import { User } from './shared/model/User';
import { Playlist } from './shared/model/Playlist';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedUser: User;

  baseUrl = "https://playlister-project.herokuapp.com/";
  constructor(private http: HttpClient) { }

  getPlaylists(): Playlist[]{
    return this.loggedUser.playlists;
  }

  loadUserDetail(email: String, password: String){
    let request = this.baseUrl + "userManager/login?email=" + email + "&password=" + password;
    return this.http.get<JSON>(request, {observe: 'response'});
  }
}