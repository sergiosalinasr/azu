import { TestBed } from '@angular/core/testing';

import { LeyService } from './ley.service';

describe('LeyService', () => {
  let service: LeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
