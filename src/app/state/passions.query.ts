import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { PassionsStore, PassionsState } from './passions.store';

@Injectable({ providedIn: 'root' })
export class PassionsQuery extends Query<PassionsState> {
  allPassions$ = this.select('passions')

  constructor(protected override store: PassionsStore) {
    super(store);
  }

}
