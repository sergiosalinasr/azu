import { TestBed } from '@angular/core/testing';

import { TablatduService } from './tablatdu.service';

describe('TablatduService', () => {
  let service: TablatduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablatduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
