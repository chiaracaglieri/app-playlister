import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Region } from '../shared/model/Region';
import { PlaylistService } from '../playlist.service';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-analytics-overview',
  templateUrl: './analytics-overview.component.html',
  styleUrls: ['./analytics-overview.component.css']
})
export class AnalyticsOverviewComponent implements OnInit {
  filterTopArtistsForm: FormGroup;
  filterTopSongsForm: FormGroup;
  filterTopGenresForm: FormGroup;

  artistResult: string[];
  genreResult: string[];
  songResult: { "track_name": string }[];

  totalNumberOfUsers: number;
  mostFrequentGender: string;
  mostFrequentRegion: string;

  artistErrorMessage: string;
  songErrorMessage: string;
  genreErrorMessage: string;

  genders = [ 
    {value:"FEMALE", displayedValue:"Female"}, 
    {value:"MALE", displayedValue:"Male" }, 
    {value:"OTHER", displayedValue:"Other"}];

    countries: Region = new Region();
  constructor(private formBuilder: FormBuilder, public userService: UserService, private playlistService: PlaylistService,
    @Inject(LOCALE_ID) public locale: string) { 
    this.filterTopArtistsForm = this.formBuilder.group({
      region: '',
      gender: '',
      minBirthday: '',
      maxBirthday: '',
      limit: ''
    }),
    this.filterTopSongsForm = this.formBuilder.group({
      region: '',
      gender: '',
      minBirthday: '',
      maxBirthday: '',
      limit: ''
    }),
    this.filterTopGenresForm = this.formBuilder.group({
      region: '',
      gender: '',
      minBirthday: '',
      maxBirthday: '',
      limit: ''
    })

    this.userService.getNumberOfUsers().subscribe(
      (response) => {
        let json: JSON = response.body;
        this.totalNumberOfUsers=json["data"];

        this.userService.getMostCommonGender().subscribe(
          (response) => {
            let json: JSON = response.body;
            this.mostFrequentGender=json["data"];

            this.userService.getMostCommonRegion().subscribe(
              (response) => {
                let json: JSON = response.body;
                this.mostFrequentRegion=json["data"];
              }
            );
          }
        );
      }
    );
  }

  ngOnInit() {
  }

  onSubmitArtists(filterTopArtistsData: FormGroup){
    let region: string = filterTopArtistsData.get("region").value;
    let gender: string = filterTopArtistsData.get("gender").value;
    let limit: number = filterTopArtistsData.get("limit").value;
    let pipe = new DatePipe(this.locale); // Use your own locale
    let minBirthday = pipe.transform(filterTopArtistsData.get("minBirthday").value, 'yyyy-MM-dd');
    let maxBirthday = pipe.transform(filterTopArtistsData.get("maxBirthday").value, 'yyyy-MM-dd');

    this.playlistService.getTopArtists(limit, minBirthday, maxBirthday, gender, region).subscribe(
      (response) => {
          let json: JSON = response.body;
          this.artistResult=json["data"];
          this.artistErrorMessage=null;
      },
      (error)=>{
        let json: JSON = error.error;
        this.artistErrorMessage = json['message'];
      }
    );

  }
  onSubmitSongs(filterTopSongsData: FormGroup){
    let region: string = filterTopSongsData.get("region").value;
    let gender: string = filterTopSongsData.get("gender").value;
    let limit: number = filterTopSongsData.get("limit").value;
    let pipe = new DatePipe(this.locale); // Use your own locale
    let minBirthday = pipe.transform(filterTopSongsData.get("minBirthday").value, 'yyyy-MM-dd');
    let maxBirthday = pipe.transform(filterTopSongsData.get("maxBirthday").value, 'yyyy-MM-dd');

    this.playlistService.getTopSongs(limit, minBirthday, maxBirthday, gender, region).subscribe(
      (response) => {
          let json: JSON = response.body;
          this.songResult=json["data"];
          this.songErrorMessage=null;
      },
      (error)=>{
        let json: JSON = error.error;
        this.songErrorMessage = json['message'];
      }
    );

  }
  onSubmitGenres(filterTopGenresData: FormGroup){
    let region: string = filterTopGenresData.get("region").value;
    let gender: string = filterTopGenresData.get("gender").value;
    let limit: number = filterTopGenresData.get("limit").value;
    let pipe = new DatePipe(this.locale); // Use your own locale
    let minBirthday = pipe.transform(filterTopGenresData.get("minBirthday").value, 'yyyy-MM-dd');
    let maxBirthday = pipe.transform(filterTopGenresData.get("maxBirthday").value, 'yyyy-MM-dd');

    this.playlistService.getTopGenres(limit, minBirthday, maxBirthday, gender, region).subscribe(
      (response) => {
          let json: JSON = response.body;
          this.genreResult=json["data"];
          this.genreErrorMessage=null;
      },
      (error)=>{
        let json: JSON = error.error;
        this.genreErrorMessage = json['message'];
      }
    );
  }

  clearSearchFields(formName: string){
    if(formName=="filterTopArtistsForm"){
      this.filterTopArtistsForm.reset();
      this.artistErrorMessage=null;
    }
    else if(formName=="filterTopSongsForm"){
      this.filterTopSongsForm.reset();
      this.songErrorMessage=null;
    }
    else if(formName=="filterTopGenresForm"){
      this.filterTopGenresForm.reset();
      this.genreErrorMessage=null;
    }
  }
}
