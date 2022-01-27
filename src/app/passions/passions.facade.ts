import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Passion } from "./passion";

import { PassionsService } from "./state/passions.service";

@Injectable()
export class PassionsFacade {
  
    constructor(
        private passionsService: PassionsService
    ){}

    getPassionsForUser(id: string): Observable<Passion[]>{
        return this.passionsService.getPassions(id)
    }

    deletePassion(userId: string, passionId: string){
        return this.passionsService.deletePassion(userId, passionId)
    }

    addPassion(userId: string, passion: Passion): Observable<Passion>{
        return this.passionsService.createPassion(userId, passion)
    }

    updatePassion(userId: string, passionId: string, libelle: string, informations: string, sinceWhen: string, examples: string[]): Observable<Passion>{
        return this.passionsService.updatePassion(userId, passionId, libelle, informations, sinceWhen, examples)
    }
}