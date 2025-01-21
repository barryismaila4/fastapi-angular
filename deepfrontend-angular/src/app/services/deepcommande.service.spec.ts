import { TestBed } from '@angular/core/testing';

import { DeepcommandeService } from './deepcommande.service';

describe('DeepcommandeService', () => {
  let service: DeepcommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeepcommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
