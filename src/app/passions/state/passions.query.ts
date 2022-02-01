import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Passion } from '../passion';
import { PassionsStore, PassionsState } from './passions.store';

@Injectable({ providedIn: 'root' })
export class PassionsQuery extends Query<PassionsState> {
  
  allPassions$ = this.select('passions')

  constructor(protected override store: PassionsStore) {
    super(store);
  }

  getAllPassions(passions: Passion[]){
    this.store.update(state => ({
      passions: passions
    }))
  }

  updatePassion(passion: Passion) {
    this.store.update(state => {
      const passions = [...state.passions];
      const index = passions.findIndex(p => p._id == passion._id);
      passions[index] = passion;
      return {
        passions
      }
    })
  }

  addPassion(passion: Passion){
    this.store.update(state => ({
      passions: [
        ...state.passions,
        passion
      ]
    }))
  }

  deletePassion(id: string){
    this.store.update(state => ({
      passions: state.passions.filter(item => item._id !== id)
    }))
  }

}
