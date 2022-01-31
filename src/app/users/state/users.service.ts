import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { UsersQuery } from './users.query';
import { UsersStore } from './users.store';

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(private usersStore: UsersStore, private http: HttpClient, private usersQuery: UsersQuery) {
  }

  getAllUsers() {
    return this.http.get<User[]>('http://localhost:5000/api/v1/users')
  }

  add(user: User) {
    this.usersStore.add(user);
  }

  update(id: string, user: Partial<User>) {
    this.usersStore.update(id, user);
  }

  remove(id: ID) {
    this.usersStore.remove(id);
  }

}
