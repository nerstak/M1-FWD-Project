import { TestBed } from '@angular/core/testing';

import { QueFaireService } from './que-faire.service';

describe('QueFaireService', () => {
  let service: QueFaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueFaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
