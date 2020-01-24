import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {
  changePasswordForm: FormGroup ;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { 
    this.changePasswordForm = this.formBuilder.group({
      newPassword: '',
      passwordConfirm: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(changePasswordData: FormGroup ){
    console.log(changePasswordData);
   this.userService.updateUser(changePasswordData).subscribe(
    (response) => {
      if(response.status === 200){
         this.userService.getUser(this.userService.loggedUser.email).subscribe(
          (response) => {
            if(response.status === 200){
              let json: JSON = response.body;
              this.userService.loggedUser = json['data'];
            }
            else{

            }
          }
         );
      } else {

      }
    }
  );

  }
}
