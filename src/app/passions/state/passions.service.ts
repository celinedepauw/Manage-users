import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Passion } from '../passion';
import { PassionsQuery } from './passions.query';
import { PassionsStore } from './passions.store';

@Injectable({ providedIn: 'root' })
export class PassionsService {

  constructor(
    private passionsStore: PassionsStore, 
    private http: HttpClient,
    private passionsQuery: PassionsQuery
  ) {
  }

  getPassions(userId: string): Observable<Passion[]>{
    return this.http.get<Passion[]>(`http://localhost:5000/api/v1/passions/${userId}`)
      .pipe(
        tap(passions => this.passionsQuery.getAll(passions))
      );
  }

  createPassion(userId: string, passion: Passion): Observable<Passion>{
    return this.http.post<Passion>(
      `http://localhost:5000/api/v1/passions/${userId}`,
      passion
      ).pipe(
        tap(passion => this.passionsQuery.add(passion))
      )
  }

  deletePassion(userId: string, passionId: string){
    return this.http.delete(`http://localhost:5000/api/v1/passions/${userId}/${passionId}`)
      .pipe(
        tap(resp => this.passionsQuery.delete(passionId))
      )
  }

  updatePassion(userId: string, passionId: string, libelle: string, informations: string, sinceWhen: string, examples: string[]): Observable<Passion>{
    return this.http.patch<Passion>(
      `http://localhost:5000/api/v1/passions/${userId}/${passionId}`,
      {
        "libelle": libelle,
        "informations": informations,
        "sinceWhen": sinceWhen,
        "examples": examples
      }
      ).pipe(
        tap(passion => this.passionsQuery.update(passion))
      )
  }
}
