import { Component, OnInit, OnDestroy } from '@angular/core';
import { Region } from '../shared/model/Region';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-account-dialog',
  templateUrl: './edit-account-dialog.component.html',
  styleUrls: ['./edit-account-dialog.component.css']
})
export class EditAccountDialogComponent implements OnDestroy {
  genders = ["Female", "Male", "Other"];

  changed: boolean = false;
  countries: Region = new Region();
  editAccountForm: FormGroup;
  oldEmail: string;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router, private formBuilder: FormBuilder, public userService: UserService) {
    this.editAccountForm = this.formBuilder.group({
      email: this.email,
      birthday: '',
      gender: '',
      region: ''
    });
    this.oldEmail = this.userService.loggedUser.email;
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  ngOnDestroy() {
    this.changed=false;
    this.userService.getUser(this.userService.loggedUser.email).subscribe(
      (response) => {
        let json: JSON = response.body;
        this.userService.loggedUser = json['data'];
      });
  }

  onSubmit(editAccountData: FormGroup) {
    console.log(editAccountData);
    this.userService.updateUser(this.oldEmail, editAccountData).subscribe(
      (response) => {
        this.userService.getUser(this.userService.loggedUser.email).subscribe(
          (response) => {
            let json: JSON = response.body;
            this.userService.loggedUser = json['data'];
            this.changed=true;
          }
        );
      }
    );

  }

}
