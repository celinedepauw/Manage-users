import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
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
    //console.log('user avant endpoint : ', user);
    return this.http.post<User>(
      'http://localhost:5000/api/v1/users',
      user,
     //facultatif :  this.httpOptions
    )
  }


   /*createNewUser(lastName: string, firstName: string, email: string, password: string, phoneNumber: string): Observable<User>{
    console.log(`user avant endpoint : nom=${lastName}, prénom=${firstName}, email=${email}, password=${password}, phoneNumber=${phoneNumber}`);
    return this.http.post<User>(
      'http://localhost:5000/api/v1/users',
      {
        firstName,
        lastName,
        email,
        password,
        phoneNumber
      },
      this.httpOptions
    )
  }*/

}
