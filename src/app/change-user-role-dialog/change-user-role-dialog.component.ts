import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../shared/model/User';

@Component({
  selector: 'app-change-user-role-dialog',
  templateUrl: './change-user-role-dialog.component.html',
  styleUrls: ['./change-user-role-dialog.component.css']
})
export class ChangeUserRoleDialogComponent implements OnInit {
  getUserForm: FormGroup;
  changeUserRoleForm: FormGroup;
  loadedUser: User;
  errorMessage: string;
  loading = false;
  outcomeMessage: string;

  roles= ["USER", "SUPERUSER", "ADMIN"];
  constructor(private formBuilder: FormBuilder, private userService: UserService) { 
    this.getUserForm = this.formBuilder.group({
      email: ''
    });

    this.changeUserRoleForm = this.formBuilder.group({
      role: ''
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

  onSubmitUpdate(changeUserRoleData: FormGroup){
    this.loading=true;
    this.userService.updateUserRole(this.loadedUser, changeUserRoleData.get("role").value).subscribe(
        (response) => {
          this.outcomeMessage="User successfully updated"
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
