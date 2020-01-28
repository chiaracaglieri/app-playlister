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
    this.userService.getUser(getUserData.get("email").value).subscribe(
        (response) => {
          if(response.status === 200){
            let json: JSON = response.body;
            this.loadedUser = json["data"];
          } else {

          }
        }
      );
  }

  onSubmitDelete(deleteUserData: FormGroup){
    this.userService.deleteUser(deleteUserData.get("email").value).subscribe(
        (response) => {
          if(response.status === 200){
            let json: JSON = response.body;
          } else {

          }
        }
      );
  }


}
