import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authentication } from '../authentication';
import { User } from '../../users/user';

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

  login(email: string, password: string){
    return this.http.post(
      'http://localhost:5000/api/v1/auth/login',
      {
        "email": email,
        "password": password
      }
    )
  }

  updateProfile(userId: string, firstname: string, lastname: string, email: string, phoneNumber: string): Observable<User>{
    return this.http.put<User>(
      `http://localhost:5000/api/v1/users/${userId}`,
      {
        "firstName": firstname,
        "lastName": lastname,
        "email": email,
        "phoneNumber": phoneNumber
      }
      )
  }

  updatePassword(previousPassword: string, newPassword: string){
    return this.http.patch(
      'http://localhost:5000/api/v1/auth/change-password',
      {
        "previousPassword": previousPassword,
        "newPassword": newPassword
      }
    )
  }
}
