import { TestBed } from '@angular/core/testing';

import { SampleRequestsService } from './sample-requests.service';

describe('SampleRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SampleRequestsService = TestBed.get(SampleRequestsService);
    expect(service).toBeTruthy();
  });
});
