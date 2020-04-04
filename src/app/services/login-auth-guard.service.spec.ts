import { TestBed } from '@angular/core/testing';

import { LoginAuthGuardService } from './login-auth-guard.service';

describe('LoginAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginAuthGuardService = TestBed.get(LoginAuthGuardService);
    expect(service).toBeTruthy();
  });
});
