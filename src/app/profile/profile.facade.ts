import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../users/user";
import { ProfileService } from "./service/profile.service";

@Injectable()
export class ProfileFacade {
  
    constructor(
        private profileService: ProfileService
    ){}

    updateProfile(userId: string, firstname: string, lastname: string, email: string, phoneNumber: string): Observable<User>{
        return this.profileService.updateProfile(userId, firstname, lastname, email, phoneNumber)
    }

    updatePassword(previousPassword: string, newPassword: string){
        return this.profileService.updatePassword(previousPassword, newPassword)
    }
 
}