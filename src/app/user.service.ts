import { Injectable } from '@angular/core';
import { User } from './shared/model/User';
import { Playlist } from './shared/model/Playlist';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  mockUser: User;
  constructor() { }

  getPlaylists(): Playlist[]{
    return [
      {name: "playlist1"}, {name: "playlist2"}
    ];
  }
}