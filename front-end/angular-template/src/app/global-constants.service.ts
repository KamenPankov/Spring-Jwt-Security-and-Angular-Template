import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalConstantsService {
  constructor() {}
}

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

export const endpoints = {
  host: 'http://localhost:8080',
  api: '/api',
  auth: {
    signin: '/signin',
    signup: '/signup',
  },
  users: {
    users: '/users',
    admin: '/admin',
    user: '/user',
    all: '/all',
    details: '/details',
  },
  roles: {
    roles: '/roles',
    all: '/all',
    add: '/add',
    delete: '/delete',
  },
};
