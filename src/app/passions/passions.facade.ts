import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Passion } from "./passion";
import { PassionsQuery } from "./state/passions.query";

import { PassionsService } from "./state/passions.service";

@Injectable()
export class PassionsFacade {

    allPassions$ = this.passionsQuery.allPassions$;

    constructor(
        private passionsQuery: PassionsQuery,
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