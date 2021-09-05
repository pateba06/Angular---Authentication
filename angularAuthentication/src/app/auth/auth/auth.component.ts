import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  // isLoading for spiner
  isLoading = false;
  // variable to show when it is an error
  error: string = null;

  constructor(private authService: AuthService) {}
  ngOnInit() {}

  /**
   * Below fucnction will be for switching between login and singup
   */
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  /**
   * Submiting the form
   */
  onFormSubmit(authForm: NgForm) {
    // we are checking if form is valid or not
    if (!authForm.valid) {
      return;
    }

    this.isLoading = true;

    // created variable 
    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      // perform Login Reuest logic
      authObs =this.authService.login(authForm.value.email, authForm.value.password)
    } else {
      // for signing up new user
      authObs= this.authService
        .signUp(authForm.value.email, authForm.value.password)
    }

    // we are saving observable data here
    authObs.subscribe(
      (response) => {
        // for spinner
        this.isLoading = false;
        },
        (errorMessage) => {
        // error handling. Used Rxjs cathError Operator and throwError in authservice. We are subscribing the message here and assigning to this.error
        this.error = errorMessage
        // for spinner
        this.isLoading = false;
        }
    )
  }

  /**
   * setting password error from below mehtod
   * @param password
   */
  getPasswordErrors(password: FormControl) {
    if (password.errors.required) {
      return 'Password Required';
    }
    if (password.errors.minlenth) {
      return 'Password is of 6 characters';
    }
  }

  /**
   * setting Email error from below mehtod
   * @param password
   */
  getEmailErrors(email: FormControl) {
    if (email.errors.required) {
      return 'Email Is Required';
    }
    if (email.errors.email) {
      return 'Email Is Invalid';
    }
  }
}
