import { Injectable, Inject } from '@angular/core';
import { User } from './shared/model/User';
import { Playlist } from './shared/model/Playlist';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { MatCalendarBody } from '@angular/material';
import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedUser: User;

  baseUrl = "https://playlister-project.herokuapp.com/";
  constructor(private http: HttpClient,
    @Inject(LOCALE_ID) public locale: string) { }

  getPlaylists(): Playlist[]{
    return this.loggedUser.playlists;
  }

  loadUserDetail(email: String, password: String){
    let request = this.baseUrl + "userManager/login?email=" + email + "&password=" + password;
    return this.http.get<JSON>(request, {observe: 'response'});
  }

  getUser(email: string){
    let request = this.baseUrl + "userManager/getUser?email=" + email;
    return this.http.get<JSON>(request, {observe: 'response'});
  }

  createUser(registerData: FormGroup){
    let request = this.baseUrl + "userManager/createUser";
    let user: User = new User();
    let pipe = new DatePipe(this.locale); // Use your own locale
    let formattedDate = pipe.transform(registerData.get("birthday").value, 'yyyy-MM-dd');

    user.email = registerData.get("email").value;
    user.password = registerData.get("password").value;
    user.birthday = formattedDate;
    user.gender = registerData.get("gender").value;
    user.region = registerData.get("region").value;
    user.role = "USER";
    return this.http.post<JSON>(request, user, {observe: 'response'});
  }

  updateUser(editAccountData: FormGroup){
    let request = this.baseUrl + "userManager/updateUser?email="+editAccountData.get("email").value;
    let user: User = new User();
    let pipe = new DatePipe(this.locale); // Use your own locale
    let formattedDate = pipe.transform(editAccountData.get("birthday").value, 'yyyy-MM-dd');

    user.email = editAccountData.get("email").value;
    user.birthday = formattedDate;
    user.gender = editAccountData.get("gender").value;
    user.region = editAccountData.get("region").value;

    return this.http.put<JSON>(request, user, {observe: 'response'});
  }
}