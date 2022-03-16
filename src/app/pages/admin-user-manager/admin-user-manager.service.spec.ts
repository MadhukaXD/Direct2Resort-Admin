import { TestBed } from '@angular/core/testing';

import { AdminUserManagerService } from './admin-user-manager.service';

describe('AdminUserManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminUserManagerService = TestBed.get(AdminUserManagerService);
    expect(service).toBeTruthy();
  });
});
