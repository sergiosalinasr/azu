import { TestBed } from '@angular/core/testing';

import { CduService } from './cdu.service';

describe('CduService', () => {
  let service: CduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
