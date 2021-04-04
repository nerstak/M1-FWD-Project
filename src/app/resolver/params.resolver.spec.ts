import { TestBed } from '@angular/core/testing';

import { ParamsResolver } from './params.resolver';

describe('ParamsResolver', () => {
  let resolver: ParamsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ParamsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
