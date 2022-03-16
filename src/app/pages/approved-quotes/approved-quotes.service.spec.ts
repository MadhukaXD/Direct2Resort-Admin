import { TestBed } from '@angular/core/testing';

import { ApprovedQuotesService } from './approved-quotes.service';

describe('ApprovedQuotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovedQuotesService = TestBed.get(ApprovedQuotesService);
    expect(service).toBeTruthy();
  });
});
