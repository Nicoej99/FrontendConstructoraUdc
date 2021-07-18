import { TestBed } from '@angular/core/testing';

import { ResetearService } from './resetear.service';

describe('ResetearService', () => {
  let service: ResetearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
