import { TestBed } from '@angular/core/testing';

import { LogisticPartnerManagerService } from './logistic-partner-manager.service';

describe('LogisticPartnerManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogisticPartnerManagerService = TestBed.get(LogisticPartnerManagerService);
    expect(service).toBeTruthy();
  });
});
