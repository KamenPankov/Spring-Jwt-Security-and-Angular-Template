import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupData } from './signup-data';
import { Injectable } from '@angular/core';
import { JwtResponse } from './JwtResponse';
import { SignInData } from './sign-in-data';
import { endpoints, httpOptions } from '../global-constants.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  signUp(signUpData: SignupData): Observable<string> {
    const url = endpoints.host + endpoints.api + endpoints.auth.signup;
    return this.http.post<string>(url, signUpData, httpOptions);
  }

  signIn(signInData: SignInData): Observable<JwtResponse> {
    const url = endpoints.host + endpoints.api + endpoints.auth.signin;
    return this.http.post<JwtResponse>(url, signInData, httpOptions);
  }
}
