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
}