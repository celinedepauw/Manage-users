import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/users/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }


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
