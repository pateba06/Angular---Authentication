import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;

  constructor() { }
  ngOnInit() {
  }

  /**
   * Below fucnction will be for switching between login and singup
   */
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  /**
   * Submiting the form
   */
  onFormSubmit(authForm:NgForm){
    console.log(authForm.value)
  }

  /**
   * setting password error from below mehtod
   * @param password 
   */
  getPasswordErrors(password:FormControl){
    if(password.errors.required){
      return 'Password Required';
    }
    if(password.errors.minlenth){
      return 'Password is of 6 characters';
    }
  }

  /**
   * setting Email error from below mehtod
   * @param password 
   */
  getEmailErrors(email:FormControl){
    if(email.errors.required){
      return 'Email Is Required'
    }
    if(email.errors.email){
      return 'Email Is Invalid'
    }
  }
}
