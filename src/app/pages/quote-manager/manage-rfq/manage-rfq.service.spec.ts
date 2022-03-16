import { TestBed } from '@angular/core/testing';

import { ManageRfqService } from './manage-rfq.service';

describe('ManageRfqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageRfqService = TestBed.get(ManageRfqService);
    expect(service).toBeTruthy();
  });
});
