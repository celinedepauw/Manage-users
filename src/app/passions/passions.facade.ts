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
}