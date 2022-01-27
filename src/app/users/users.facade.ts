import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { UserService } from './services/user.service';
import { User } from "./user";

@Injectable()
export class UsersFacade {
  
    constructor(
        private userService: UserService
    ){}

    getAllUsers(): Observable<User[]>{
        return this.userService.getAllUsers()
    }

    getUserById(id: string): Observable<User>{
        return this.userService.getUserById(id)
    }

    deleteUser(id: string){
        return this.userService.deleteUser(id)
    }

    updateUser(userId: string, firstname: string, lastname: string, email: string, phoneNumber: string): Observable<User>{
        return this.userService.updateUser(userId, firstname, lastname, email, phoneNumber)
    }
}