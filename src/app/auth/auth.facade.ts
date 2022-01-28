import { Injectable } from "@angular/core";
import { Authentication } from "./authentication";
import { AuthenticationService } from "./services/authentication.service";

@Injectable()
export class AuthFacade {
  
    constructor(
        private authService: AuthenticationService
    ){}

    login(email: string, password: string){
        return this.authService.login(email, password)
    }

    register(profile: Authentication){
        return this.authService.register(profile)
    }
}