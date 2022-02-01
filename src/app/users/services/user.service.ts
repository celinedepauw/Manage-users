import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { User } from '../user';
import { User } from '../../users/state/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<User[]>{
    return this.http  
      .get<User[]>('http://localhost:5000/api/v1/users')
  }

  getUserById(id: string): Observable<User>{
    return this.http.get<User>(`http://localhost:5000/api/v1/users/${id}`)
  }

  createNewUser(user: User): Observable<User>{
    console.log('user avant endpoint : ', user);
    return this.http.post<User>(
      'http://localhost:5000/api/v1/users',
      user
    )
  }

  deleteUser(userId: string){
    return this.http.delete(`http://localhost:5000/api/v1/users/${userId}`)
  }

  updateUser(userId: string, firstname: string, lastname: string, email: string, phoneNumber: string, age: string, sex: string): Observable<User>{
    return this.http.put<User>(
      `http://localhost:5000/api/v1/users/${userId}`,
      {
        "firstName": firstname,
        "lastName": lastname,
        "email": email,
        "phoneNumber": phoneNumber,
        "age": age,
        "sex": sex
      }
      )
  }

}
