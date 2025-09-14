import { TestBed } from '@angular/core/testing';

import { RiesgoService } from './riesgo.service';

describe('RiesgoService', () => {
  let service: RiesgoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiesgoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
