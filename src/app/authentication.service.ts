import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication } from './authentication';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  register(profile: Authentication){
    return this.http.post<Authentication>(
      'http://localhost:5000/api/v1/auth/register',
      profile
    )
  }
}
