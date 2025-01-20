import { TestBed } from '@angular/core/testing';

import { DeepService } from './deep.service';

describe('DeepService', () => {
  let service: DeepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
