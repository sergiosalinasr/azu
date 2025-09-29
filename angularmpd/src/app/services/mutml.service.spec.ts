import { TestBed } from '@angular/core/testing';

import { MutmlService } from './mutml.service';

describe('MutmlService', () => {
  let service: MutmlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutmlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
