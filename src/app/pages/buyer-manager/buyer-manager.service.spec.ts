import { TestBed } from '@angular/core/testing';

import { BuyerManagerService } from './buyer-manager.service';

describe('BuyerManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyerManagerService = TestBed.get(BuyerManagerService);
    expect(service).toBeTruthy();
  });
});
