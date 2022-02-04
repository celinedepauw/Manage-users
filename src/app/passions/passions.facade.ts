import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Passion } from "./passion";
import { PassionsQuery } from "./state/passions.query";

import { PassionService } from "./passion.service";

@Injectable()
export class PassionsFacade {

    //allPassions$ = this.passionsQuery.allPassions$;
    allPassions$ = this.passionsQuery.select('passions');

    constructor(
        private passionsQuery: PassionsQuery,
        private passionService: PassionService,
    ){}

    getPassionsForUser(id: string): Observable<Passion[]>{
        return this.passionService.getPassionsForUser(id).pipe(
            tap(passions => this.passionsQuery.getAllPassions(passions)
          ));
    }

    deletePassion(userId: string, passionId: string){
        return this.passionService.deletePassion(userId, passionId).pipe(
            tap(resp => this.passionsQuery.deletePassion(passionId)
            ));
    }

    addPassion(userId: string, passion: Passion): Observable<Passion>{
        return this.passionService.createPassion(userId, passion).pipe(
            tap(passion => this.passionsQuery.addPassion(passion))
          )
    }

    updatePassion(userId: string, passionId: string, libelle: string, informations: string, sinceWhen: string, examples: string[]): Observable<Passion>{
        return this.passionService.updatePassion(userId, passionId, libelle, informations, sinceWhen, examples).pipe(
            tap(passion => this.passionsQuery.updatePassion(passion))
          )
    }
}