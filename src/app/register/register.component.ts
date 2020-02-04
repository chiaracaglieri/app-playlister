import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { UserService } from '../user.service';
import { Region } from '../shared/model/Region';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  genders = [
    { value: "FEMALE", displayedValue: "Female" },
    { value: "MALE", displayedValue: "Male" },
    { value: "OTHER", displayedValue: "Other" }];

  countries: Region = new Region();
  registerForm: FormGroup;
  loading = false;
  registerError = null;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
    this.registerForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
      passwordConfirm: '',
      birthday: '',
      gender: '',
      region: ''
    });
  }

  getEmailErrorMessage() {
    return this.email.hasError('email') ? 'Not a valid email' : '';
        
  }

  getPasswordErrorMessage() {
    return this.password.hasError('minlength') ? 'Password min length is 8': '';
        
  }
  
  ngOnInit() {
  }

  onSubmit(registerData: FormGroup) {
    if(!this.registerForm.invalid){
      this.loading = true;
      console.log(registerData);
      if (registerData.get("password").value != registerData.get("passwordConfirm").value) {
        console.log("passwords dont match");
      }
      this.userService.createUser(registerData).subscribe(
        (response) => {
          let json: JSON = response.body;
          this.userService.loggedUser = json['data'];
          this.loading = false;
          this.router.navigateByUrl('/dashboard');
        },
        (error) => {
          console.log(error);
          if(error.error.message === "User email already used"){
            this.registerError= "Error: user email already in use"
          }
          else {
            this.registerError = "Error: check fields and retry";
          }
          this.loading = false;
        }
      );
    }

  }

  loadDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  loadLogin() {
    this.router.navigateByUrl('/login');
  }

}
