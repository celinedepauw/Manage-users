import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Passion } from './passion';

@Injectable({
  providedIn: 'root'
})
export class PassionService {

  public _passions = new BehaviorSubject<Passion[]>([]);

  constructor(
    private http : HttpClient
  ) {}

  getPassions(): Observable<Passion[]>{
    return this.http.get<Passion[]>('http://localhost:5000/api/v1/passions')
  }

  getPassionsForUser(userId: string): Observable<Passion[]>{
    return this.http.get<Passion[]>(`http://localhost:5000/api/v1/passions/${userId}`)
  }

  createPassion(userId: string,passion: Passion): Observable<Passion>{
    return this.http.post<Passion>(
      `http://localhost:5000/api/v1/passions/${userId}`,
      passion
      )
  }

  updatePassion(passionId: string, libelle: string, informations: string, sinceWhen: string, examples: string[]): Observable<Passion>{
    return this.http.patch<Passion>(
      `http://localhost:5000/api/v1/passions/${passionId}`,
      {
        "libelle": libelle,
        "informations": informations,
        "sinceWhen": sinceWhen,
        "examples": examples
      }
      )
  }

  deletePassion(passionId: string){
    return this.http.delete(`http://localhost:5000/api/v1/passions/${passionId}`)
  }

}
