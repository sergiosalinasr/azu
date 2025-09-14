import { TestBed } from '@angular/core/testing';

import { TduService } from './tdu.service';

describe('TduService', () => {
  let service: TduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
