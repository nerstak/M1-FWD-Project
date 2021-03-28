import { TestBed } from '@angular/core/testing';

import { DetailsArticleService } from './details-article.service';

describe('DetailsArticleService', () => {
  let service: DetailsArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
