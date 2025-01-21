import { TestBed } from '@angular/core/testing';

import { DeepmagasinService } from './deepmagasin.service';

describe('DeepmagasinService', () => {
  let service: DeepmagasinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeepmagasinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
