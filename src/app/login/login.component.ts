import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../shared/model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup ;
  loginError = false;
  loading = false;

  constructor(private router: Router,private formBuilder: FormBuilder, private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
   }

  ngOnInit() {
  }

  onSubmit(loginData: FormGroup ){
    this.loading=true;
    this.userService.loadUserDetail(loginData.get("email").value, loginData.get("password").value).subscribe(
      (response) => {
          this.loginError = false;
          let json: JSON = response.body;
          this.userService.loggedUser = json['data'];
          this.loading=false;
          this.router.navigateByUrl('/dashboard');
      },
      (error) => {
        this.loginError = true;
          this.loading=false;
      }
    );

  }

  loadRegister(){
    this.router.navigateByUrl('/register');
  }

}
