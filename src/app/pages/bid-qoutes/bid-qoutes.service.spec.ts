import { TestBed } from '@angular/core/testing';

import { BidQoutesService } from './bid-qoutes.service';

describe('BidQoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BidQoutesService = TestBed.get(BidQoutesService);
    expect(service).toBeTruthy();
  });
});
