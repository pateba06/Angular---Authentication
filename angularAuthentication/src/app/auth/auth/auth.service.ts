import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';

// created interface we can create another file but I kept it here. this is the response on post call
interface AuthResponseData{
idToken:	string;
email:	string;
refreshToken: string;
expiresIn:string;
localId:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http:HttpClient) { }

/**
 * Created method to post the emailId and Password to Firebase API
 * @param email 
 * @param password 
 * @returns 
 */
signUp(email:string, password:string){
  return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrpGRruHVQdRNhJTm-TrFlPjXVK0YCNjk`
  ,{email,password,returnSecureToken : true});
}
}
