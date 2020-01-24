import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Region } from '../shared/model/Region';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  genders = [ "Female", "Male", "Other"];
  countries: Region = new Region();
  registerForm: FormGroup ;

  constructor(private router: Router,private formBuilder: FormBuilder, private userService: UserService) {
    this.registerForm = this.formBuilder.group({
      email: '',
      password: '',
      passwordConfirm: '',
      birthday: '',
      gender: '',
      region: ''
    });
   }

  ngOnInit() {
  }

  onSubmit(registerData: FormGroup ){
    console.log(registerData);
    if(registerData.get("password").value!=registerData.get("passwordConfirm").value){
      console.log("passwords dont match");
    }
    // this.userService.loadUserDetail(loginData.get("email").value, loginData.get("password").value).subscribe(
    //   (response) => {
    //     if(response.status === 200){
    //       this.loginError = false;
    //       let json: JSON = response.body;
    //       this.userService.loggedUser = json['data'];
    //       this.router.navigateByUrl('/dashboard');
    //     } else {
    //       this.loginError = true;
    //     }
    //   }
    // );

  }

  loadDashboard(){
    this.router.navigateByUrl('/dashboard');
  }

  loadLogin(){
    this.router.navigateByUrl('/login');
  }

}
