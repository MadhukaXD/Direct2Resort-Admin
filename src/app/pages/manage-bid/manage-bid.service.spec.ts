import { TestBed } from '@angular/core/testing';

import { ManageBidService } from './manage-bid.service';

describe('ManageBidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageBidService = TestBed.get(ManageBidService);
    expect(service).toBeTruthy();
  });
});
