import { ComponentFixture, TestBed } from '@angular/core/testing';

import { N8nwidgetComponent } from './n8nwidget.component';

describe('N8nwidgetComponent', () => {
  let component: N8nwidgetComponent;
  let fixture: ComponentFixture<N8nwidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [N8nwidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(N8nwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
