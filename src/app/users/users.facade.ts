import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { filter, map } from 'rxjs/operators';

import { UserService } from './services/user.service';
import { UsersQuery } from "./state/users.query";
import { UsersService } from "./state/users.service";
import { UsersStore } from "./state/users.store";
//import { User } from "./user";
import { User } from '../users/state/user.model';

@Injectable()
export class UsersFacade {
  
    allUsers$ = this.usersQuery.selectAll();

    constructor(
        private userService: UserService,
        private usersQuery: UsersQuery,
        private usersStore: UsersStore
    ){}

    getAllUsers(): Observable<User[]>{
        return this.userService.getAllUsers().pipe(tap(entities => {
            this.usersStore.set(entities);
          }));
    }

    getUserFromStore(userId: string){
        return this.usersQuery.getEntity(userId)
    }

    createUser(user: User): Observable<User>{
        return this.userService.createNewUser(user).pipe(tap(user => {
            this.usersStore.add(user)
        }));
    
    }

    /*deleteUser(id: string){
        return this.userService.deleteUser(id).pipe(tap(resp => {
            this.usersStore.update(state => ({
                users: state.users.filter(item => item._id !== id)
            }))
        }))
    }*/

    deleteUser(id: string){
        return this.userService.deleteUser(id).pipe(tap(resp => {
            this.usersStore.remove(id)
        }))
    }

    /*updateUser(userId: string, firstname: string, lastname: string, email: string, phoneNumber: string, age: string, sex: string): Observable<User>{
        return this.userService.updateUser(userId, firstname, lastname, email, phoneNumber, age, sex).pipe(tap(user => {
        }))
    }*/

    updateUser(userId: string, firstname: string, lastname: string, email: string, phoneNumber: string, age: string, sex: string): Observable<User>{
        return this.userService.updateUser(userId, firstname, lastname, email, phoneNumber, age, sex).pipe(tap(user => {
            this.usersStore.update(userId, user)
        }))
    }
}