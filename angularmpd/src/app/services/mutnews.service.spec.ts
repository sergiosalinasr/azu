import { TestBed } from '@angular/core/testing';

import { MutnewsService } from './mutnews.service';

describe('MutnewsService', () => {
  let service: MutnewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutnewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
