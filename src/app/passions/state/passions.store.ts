import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Passion } from '../passion';

export interface PassionsState {
   passions: Passion[]
}

export function createInitialState(): PassionsState {
  return {
    passions: []
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'passions' })
export class PassionsStore extends Store<PassionsState> {

  constructor() {
    super(createInitialState());
  }

}
