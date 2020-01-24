import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Region } from '../shared/model/Region';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  genders = [ 
    {value:"FEMALE", displayedValue:"Female"}, 
    {value:"MALE", displayedValue:"Male" }, 
    {value:"OTHER", displayedValue:"Other"}];
    
  countries: Region = new Region();
  registerForm: FormGroup ;

  email = new FormControl('', [Validators.required, Validators.email]);
  
  constructor(private router: Router,private formBuilder: FormBuilder, private userService: UserService) {
    this.registerForm = this.formBuilder.group({
      email: this.email,
      password: '',
      passwordConfirm: '',
      birthday: '',
      gender: '',
      region: ''
    });
   }

   getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  ngOnInit() {
  }

  onSubmit(registerData: FormGroup ){
    console.log(registerData);
    if(registerData.get("password").value!=registerData.get("passwordConfirm").value){
      console.log("passwords dont match");
    }
   this.userService.createUser(registerData).subscribe(
      (response) => {
        if(response.status === 201){
           let json: JSON = response.body;
           this.userService.loggedUser = json['data'];
           this.router.navigateByUrl('/dashboard');
        } else {

        }
      }
    );

  }

  loadDashboard(){
    this.router.navigateByUrl('/dashboard');
  }

  loadLogin(){
    this.router.navigateByUrl('/login');
  }

}
