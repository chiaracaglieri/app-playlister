import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';
import { Playlist } from '../shared/model/Playlist';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SongService } from '../song.service';
import { Song } from '../shared/model/Song';


@Component({
  selector: 'app-add-song-to-playlist-dialog',
  templateUrl: './add-song-to-playlist-dialog.component.html',
  styleUrls: ['./add-song-to-playlist-dialog.component.css']
})
export class AddSongToPlaylistDialogComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  playlist: Playlist;
  showSearchError = false;

  loadedSongs: Song[];
  
  genres= [	"A Capella",
	"Alternative",
	"Anime",
	"Blues",
	"Children's Music",
	"Children’s Music",
	"Classical",
	"Comedy",
	"Country",
	"Dance",
	"Electronic",
	"Folk",
	"Hip-Hop",
	"Indie",
	"Jazz",
	"Movie",
	"Opera",
	"Pop",
	"R&B",
	"Rap",
	"Reggae",
	"Reggaeton",
	"Rock",
	"Ska",
	"Soul",
	"Soundtrack",
  "World"];

  addSongForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    private songService: SongService) {
    this.playlist = data.playlist;
    this.addSongForm = this.formBuilder.group({
      track_name: '',
      artist_name: '',
      genre: ''
    });
  }


  onSubmit(addSongData: FormGroup){
    console.log(addSongData);
    if(addSongData.get("track_name").value=="" &&
      addSongData.get("artist_name").value=="" &&
      addSongData.get("genre").value==""){
        this.showSearchError = true;
      }
    this.songService.getSongs( (addSongData.get("artist_name").value==""? null: addSongData.get("artist_name").value),
    (addSongData.get("track_name").value=="" ? null: addSongData.get("track_name").value),
    (addSongData.get("genre").value=="" ? null: addSongData.get("genre").value) ).subscribe(
        (response) => {
          let json: JSON = response.body;
          this.loadedSongs = json["data"];
        },
        (error) => {
          this.showSearchError = true;
        }
      );
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
