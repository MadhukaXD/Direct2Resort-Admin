import { TestBed } from '@angular/core/testing';

import { ManageQuoteService } from './manage-quote.service';

describe('ManageQuoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageQuoteService = TestBed.get(ManageQuoteService);
    expect(service).toBeTruthy();
  });
});
