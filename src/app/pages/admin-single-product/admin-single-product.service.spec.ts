import { TestBed } from '@angular/core/testing';

import { AdminSingleProductService } from './admin-single-product.service';

describe('AdminSingleProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminSingleProductService = TestBed.get(AdminSingleProductService);
    expect(service).toBeTruthy();
  });
});
