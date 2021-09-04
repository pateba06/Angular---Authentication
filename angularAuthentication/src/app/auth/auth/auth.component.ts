import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  // isLoading for spiner
  isLoading = false;
  // variable to show when it is an error
  error:string =null;

  constructor(private authService:AuthService) { }
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
 
    // we are checking if form is valid or not
    if(!authForm.valid){
      return;
    }

    this.isLoading =true;

    // 
    if(this.isLoginMode){
      // perform Login Reuest logic
    } else {
      // for signing up new user
      this.authService.signUp(authForm.value.email,authForm.value.password).subscribe((res)=>{
        console.log(res)
        // for spinner
        this.isLoading=false;
      // error handling
      }, error=> {
        console.log(error)
        // for spinner
        this.isLoading=false;
        // for showing error message
        this.error = "An Error Has Occured. Please Try Again!"
      })
    }
    
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
