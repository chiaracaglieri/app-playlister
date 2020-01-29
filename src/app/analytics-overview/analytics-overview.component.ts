import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Region } from '../shared/model/Region';

@Component({
  selector: 'app-analytics-overview',
  templateUrl: './analytics-overview.component.html',
  styleUrls: ['./analytics-overview.component.css']
})
export class AnalyticsOverviewComponent implements OnInit {
  filterTopArtistsForm: FormGroup;


  genders = [ 
    {value:"FEMALE", displayedValue:"Female"}, 
    {value:"MALE", displayedValue:"Male" }, 
    {value:"OTHER", displayedValue:"Other"}];

    countries: Region = new Region();
  constructor(private formBuilder: FormBuilder) { 
    this.filterTopArtistsForm = this.formBuilder.group({
      region: '',
      gender: '',
      minBirthday: '',
      maxBirthday: ''
    })
  }

  ngOnInit() {
  }

  onSubmit(filterTopArtistsData: FormGroup){

  }
}
