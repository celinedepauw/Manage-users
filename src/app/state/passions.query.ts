import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { findIndex } from 'rxjs';
import { Passion } from '../passions/passion';
import { PassionsStore, PassionsState } from './passions.store';

@Injectable({ providedIn: 'root' })
export class PassionsQuery extends Query<PassionsState> {
  
  allPassions$ = this.select('passions')

  constructor(protected override store: PassionsStore) {
    super(store);
  }

  update(passion: Passion) {
    this.store.update(state => {
      const passions = [...state.passions];
      const index = passions.findIndex(p => p._id == passion._id);
      passions[index] = passion;
      return {
        passions
      }
    })
  }

  add(passion: Passion){
    this.store.update(state => ({
      passions: [
        ...state.passions,
        passion
      ]
    }))
  }

  delete(id: string){
    this.store.update(state => ({
      passions: state.passions.filter(item => item._id !== id)
    }))
  }

}
