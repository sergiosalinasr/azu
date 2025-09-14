import { TestBed } from '@angular/core/testing';

import { N8nwidget2Service } from './n8nwidget2.service';

describe('N8nwidget2Service', () => {
  let service: N8nwidget2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(N8nwidget2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
