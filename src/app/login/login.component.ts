import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  
  constructor(private router: Router,private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
   }

  ngOnInit() {
  }

  onSubmit(loginData){
    console.log(loginData);
  }

  loadDashboard(){
    this.router.navigateByUrl('/dashboard');
  }

  loadRegister(){
    this.router.navigateByUrl('/register');
  }

}
