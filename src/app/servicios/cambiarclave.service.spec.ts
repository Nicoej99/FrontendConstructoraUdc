import { TestBed } from '@angular/core/testing';

import { CambiarclaveService } from './cambiarclave.service';

describe('CambiarclaveService', () => {
  let service: CambiarclaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambiarclaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
