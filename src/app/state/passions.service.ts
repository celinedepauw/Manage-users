import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Passion } from '../passions/passion';
import { PassionsStore } from './passions.store';

@Injectable({ providedIn: 'root' })
export class PassionsService {

  constructor(private passionsStore: PassionsStore, private http: HttpClient) {
  }

  getPassions(userId: string): Observable<Passion[]>{
    return this.http.get<Passion[]>(`http://localhost:5000/api/v1/passions/${userId}`)
      .pipe(
        tap(passions => {
          this.passionsStore.update(state => ({
            passions: passions
          }))
        })
      );
  }

  /*addPassion(userId: string, passion: Passion){
    return this.http.post<Passion>(
      `http://localhost:5000/api/v1/passions/${userId}`,
      passion
      ).pipe(
        tap(passion => {
          this.passionsStore.
        }

        )
      )
  }*/
}
