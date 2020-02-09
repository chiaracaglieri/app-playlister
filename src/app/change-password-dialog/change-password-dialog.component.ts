import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnDestroy {
  changePasswordForm: FormGroup;
  changed: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: '',
      passwordConfirm: ''
    });
  }

  ngOnDestroy() {
    this.changed=false;
  }

  onSubmit(changePasswordData: FormGroup) {
    console.log(changePasswordData);
    this.userService.updateUser(this.userService.loggedUser.email, changePasswordData).subscribe(
      (response) => {
        this.userService.getUser(this.userService.loggedUser.email).subscribe(
          (response) => {
            let json: JSON = response.body;
            this.userService.loggedUser = json['data'];
            this.changed=true;
          });
      }
    );
  }
}
