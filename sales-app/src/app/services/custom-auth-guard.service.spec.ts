import { TestBed } from '@angular/core/testing';

import { CustomAuthGuardService } from './custom-auth-guard.service';

describe('CustomAuthGuardService', () => {
  let service: CustomAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
