import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

// created interface we can create another file but I kept it here. this is the response on post call
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Created method to post the emailId and Password to Firebase API
   * @param email
   * @param password
   * @returns
   */
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrpGRruHVQdRNhJTm-TrFlPjXVK0YCNjk`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        // catchError is Rxjs operator. so we can use if any error bcz of post api error we can catch error and send message accordingly
        catchError(this.getErrorHandler));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrpGRruHVQdRNhJTm-TrFlPjXVK0YCNjk`,
      { email, password, returnSecureToken: true }
    ).pipe(catchError(this.getErrorHandler));
  }

  /**
   * This method will handle commonly for both login and sign up
   */
  getErrorHandler(errorRes:HttpErrorResponse){
          // Default Error Message
          let errorMessage = 'An Error Has Occured. Please Try Again!';
          // to catch network error
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          // Error handling based on the response from Post Api
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'Email Already Exists';
              break;
              case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email Not Found';
                break;
                case 'INVALID_PASSWORD':
                  errorMessage = 'Invalid Password';
                  break;
          }
          // this will send error observable it is part of rxjs
          return throwError(errorMessage);
  }
}
