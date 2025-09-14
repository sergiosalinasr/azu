import { ComponentFixture, TestBed } from '@angular/core/testing';

import { N8nwidget2Component } from './n8nwidget2.component';

describe('N8nwidget2Component', () => {
  let component: N8nwidget2Component;
  let fixture: ComponentFixture<N8nwidget2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [N8nwidget2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(N8nwidget2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
