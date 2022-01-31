import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

import { UserService } from './services/user.service';
import { UsersQuery } from "./state/users.query";
import { UsersService } from "./state/users.service";
import { UsersStore } from "./state/users.store";
import { User } from "./user";

@Injectable()
export class UsersFacade {
  
    allUsers$ = this.usersQuery.selectAll();

    constructor(
        private userService: UserService,
        private usersQuery: UsersQuery,
        private usersService: UsersService,
        private usersStore: UsersStore
    ){}

    getAllUsers(): Observable<User[]>{
        return this.usersService.getAllUsers().pipe(tap(entities => {
            this.usersStore.set(entities);
          }));
    }

    getUserFromStore(userId: string){
        return this.usersQuery.getEntity(userId)
    }

    getUserById(id: string): Observable<User>{
        return this.userService.getUserById(id)
    }

    createUser(user: User): Observable<User>{
        return this.userService.createNewUser(user)
    }

    deleteUser(id: string){
        return this.userService.deleteUser(id)
    }

    updateUser(userId: string, firstname: string, lastname: string, email: string, phoneNumber: string, age: string, sex: string): Observable<User>{

        return this.userService.updateUser(userId, firstname, lastname, email, phoneNumber, age, sex)
    }
}