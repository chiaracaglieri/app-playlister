import { Playlist } from './Playlist';

export class User {
    email: string;
    password: string;
    role: string;
    region: string;
    gender: string;
    birthday: string;
    playlists: Playlist[];
  }