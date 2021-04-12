import { User } from './../user/user';
import { endpoints, httpOptions } from './../global-constants.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAdminArea(): Observable<string> {
    const url =
      endpoints.host +
      endpoints.api +
      endpoints.users.users +
      endpoints.users.admin;
    return this.http.get<string>(url);
  }

  getUserArea(): Observable<string> {
    const url =
      endpoints.host +
      endpoints.api +
      endpoints.users.users +
      endpoints.users.user;
    return this.http.get<string>(url);
  }

  getAllUsers(): Observable<object> {
    const url =
      endpoints.host +
      endpoints.api +
      endpoints.users.users +
      endpoints.users.all;
    return this.http.get<object>(url);
  }

  getUserDetails(id: number): Observable<object> {
    const url =
      endpoints.host +
      endpoints.api +
      endpoints.users.users +
      endpoints.users.details +
      '/' +
      id;
    return this.http.get<object>(url);
  }

  updateUserDetails(id: number, user: User): Observable<object> {
    const url =
      endpoints.host +
      endpoints.api +
      endpoints.users.users +
      endpoints.users.details +
      '/' +
      id;
    return this.http.put<object>(url, user, httpOptions);
  }
}
