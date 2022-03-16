import { TestBed } from '@angular/core/testing';

import { DataSetupService } from './data-setup.service';

describe('DataSetupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataSetupService = TestBed.get(DataSetupService);
    expect(service).toBeTruthy();
  });
});
