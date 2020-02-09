import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../shared/model/User';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {
  getUserForm: FormGroup;
  deleteUserForm: FormGroup;
  loadedUser: User;
  errorMessage: string;
  loading = false;
  outcomeMessage: string;

  email = new FormControl({ value: '', disabled: true });
  role = new FormControl({ value: '', disabled: true });
  birthday = new FormControl({ value: '', disabled: true });
  gender = new FormControl({ value: '', disabled: true });
  region = new FormControl({ value: '', disabled: true });

  constructor(private formBuilder: FormBuilder, private userService: UserService) { 
    this.getUserForm = this.formBuilder.group({
      email: ''
    });

    this.deleteUserForm = this.formBuilder.group({
      email: this.email,
      role: this.role,
      birthday: this.birthday,
      gender: this.gender,
      region: this.region,
    });
  }

  ngOnInit() {
  }

  onSubmit(getUserData: FormGroup){
    this.loading=true;
    this.userService.getUser(getUserData.get("email").value).subscribe(
        (response) => {
            let json: JSON = response.body;
            this.loadedUser = json["data"]; 
            this.errorMessage=null; 
            this.loading=false;
        },
        (error) => {
          let json: JSON = error.error;
          this.errorMessage = json['message'];
          this.loading=false;
        }
      );
  }

  onSubmitDelete(deleteUserData: FormGroup){
    this.loading=true;
    this.userService.deleteUser(deleteUserData.get("email").value).subscribe(
        (response) => { 
            this.outcomeMessage="User successfully deleted."
            this.loading=false;
        },
        (error) => {
          let json: JSON = error.error;
          this.errorMessage = json['message'];
          this.loading=false;
        }
      );
  }


}
