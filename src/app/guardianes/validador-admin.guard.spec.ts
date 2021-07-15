import { TestBed } from '@angular/core/testing';

import { ValidadorAdminGuard } from './validador-admin.guard';

describe('ValidadorAdminGuard', () => {
  let guard: ValidadorAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidadorAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
