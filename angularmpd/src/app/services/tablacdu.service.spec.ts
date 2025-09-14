import { TestBed } from '@angular/core/testing';

import { TablacduService } from './tablacdu.service';

describe('TablacduService', () => {
  let service: TablacduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablacduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
