import { TestBed } from '@angular/core/testing';

import { SellerManagerService } from './seller-manager.service';

describe('SellerManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerManagerService = TestBed.get(SellerManagerService);
    expect(service).toBeTruthy();
  });
});
