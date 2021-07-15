import { TestBed } from '@angular/core/testing';

import { ValidadorVendedorGuard } from './validador-vendedor.guard';

describe('ValidadorVendedorGuard', () => {
  let guard: ValidadorVendedorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidadorVendedorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
