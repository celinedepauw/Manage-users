import { TestBed } from '@angular/core/testing';

import { PassionService } from './passion.service';

describe('PassionService', () => {
  let service: PassionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
