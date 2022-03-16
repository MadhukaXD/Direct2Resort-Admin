import { TestBed } from '@angular/core/testing';

import { AdminNotificationService } from './admin-notification.service';

describe('AdminNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminNotificationService = TestBed.get(AdminNotificationService);
    expect(service).toBeTruthy();
  });
});
