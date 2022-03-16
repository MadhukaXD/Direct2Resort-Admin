import { TestBed } from '@angular/core/testing';

import { BidListService } from './bid-list.service';

describe('BidListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BidListService = TestBed.get(BidListService);
    expect(service).toBeTruthy();
  });
});
