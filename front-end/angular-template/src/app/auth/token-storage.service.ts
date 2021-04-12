import { Injectable } from '@angular/core';

const TOKEN_KEY = 'JwtToken';
const USERNAME_KEY = 'Username';
const AUTHORITIES_KEY = 'Authorities';
const USER_ID_KEY = 'Id';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

constructor() { }

public clearStorage(): void {
  window.sessionStorage.clear();
}

public saveToken(token: string): void {
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY, token);
}

public getToken(): string {
  return window.sessionStorage.getItem(TOKEN_KEY);
}

public saveUsername(username: string): void {
  window.sessionStorage.removeItem(USERNAME_KEY);
  window.sessionStorage.setItem(USERNAME_KEY, username);
}

public getUsername(): string {
  return window.sessionStorage.getItem(USERNAME_KEY);
}

public saveUserId(id: string): void {
  window.sessionStorage.removeItem(USER_ID_KEY);
  window.sessionStorage.setItem(USER_ID_KEY, id);
}

public getUserId(): string {
  return window.sessionStorage.getItem(USER_ID_KEY);
}

public saveAuthorities(authorities: string[]): void {
  window.sessionStorage.removeItem(AUTHORITIES_KEY);
  window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
}

public getAuthorities(): string[] {
  const roles: Array<string> = [];

  if (sessionStorage.getItem(AUTHORITIES_KEY)) {
    JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(role => {
      roles.push(role.authority);
    });
  }

  return roles;
}

}
