import { TestBed } from '@angular/core/testing';

import { ProductSeriesManagerService } from './product-series-manager.service';

describe('ProductSeriesManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductSeriesManagerService = TestBed.get(ProductSeriesManagerService);
    expect(service).toBeTruthy();
  });
});
