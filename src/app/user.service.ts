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

  userHasSongs(): boolean{
    let playlists=this.getPlaylists();
    for(let playlist of playlists){
      if(playlist.songs!=null){
        return true;
      }
    }
    return false;
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

  updateUser(oldEmail: string, accountData: FormGroup){
    let request = this.baseUrl + "userManager/updateUser?email="+oldEmail;
    let user: User = new User();
    if(accountData.get("newPassword")!=null){
      user.password = accountData.get("newPassword").value;
    } else {
      let pipe = new DatePipe(this.locale); // Use your own locale
      let formattedDate = pipe.transform(accountData.get("birthday").value, 'yyyy-MM-dd');
  
      user.email = accountData.get("email").value;
      user.birthday = formattedDate;
      user.gender = accountData.get("gender").value;
      user.region = accountData.get("region").value;
    }

    return this.http.put<JSON>(request, user, {observe: 'response'});
  }

  updateUserRole(userToUpdate: User, role: string){
    let request = this.baseUrl + "userManager/updateUser?email="+userToUpdate.email;
    userToUpdate.role=role;
    return this.http.put<JSON>(request, userToUpdate, {observe: 'response'});
  }

  deleteUser(email: string) {
    let request = this.baseUrl + "userManager/deleteUser?email="+ email;
    return this.http.delete<JSON>(request, {observe: 'response'});
  }
}