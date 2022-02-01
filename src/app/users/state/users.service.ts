import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { User } from './user.model';
import { UsersStore } from './users.store';

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(
    private usersStore: UsersStore, 
    private http: HttpClient
  ) {}

  getAllUsers() {
    return this.http.get<User[]>('http://localhost:5000/api/v1/users')
  }

  addUser(user: User) {
    this.usersStore.add(user);
  }

  updateUser(id: string, user: Partial<User>) {
    this.usersStore.update(id, user);
  }

  removeUser(id: ID) {
    this.usersStore.remove(id);
  }

}
