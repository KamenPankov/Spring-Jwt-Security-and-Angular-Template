import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints, httpOptions } from '../global-constants.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<object> {
    // const url = this.baseUrl + this.endPoints.all;
    const url = endpoints.host + endpoints.api + endpoints.roles.roles + endpoints.roles.all;
    return this.http.get<object>(url);
  }

  addRole(name: string): Observable<object> {
    // const url = this.baseUrl + this.endPoints.add;
    const url = endpoints.host + endpoints.api + endpoints.roles.roles + endpoints.roles.add;
    return this.http.post(url, {name}, httpOptions);
  }

  deleteRole(id: number): Observable<object> {
    const url = endpoints.host + endpoints.api + endpoints.roles.roles + endpoints.roles.delete + '/' + id;
    return this.http.delete(url);
  }
}
