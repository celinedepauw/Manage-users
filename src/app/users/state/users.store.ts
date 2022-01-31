import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from './user.model';

export interface UsersState extends EntityState<User> {
  users: User[];
}

const initialState: UsersState = {
  users: []
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users', idKey: '_id' })
export class UsersStore extends EntityStore<UsersState> {

  constructor() {
    super(initialState);
  }

}
