import { TestBed } from '@angular/core/testing';

import { UserManagerModalService } from './user-manager-modal.service';

describe('UserManagerModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserManagerModalService = TestBed.get(UserManagerModalService);
    expect(service).toBeTruthy();
  });
});
