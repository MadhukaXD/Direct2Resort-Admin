import { TestBed } from '@angular/core/testing';

import { QuoteManagerService } from './quote-manager.service';

describe('QuoteManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuoteManagerService = TestBed.get(QuoteManagerService);
    expect(service).toBeTruthy();
  });
});
