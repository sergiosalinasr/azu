import { ComponentFixture, TestBed } from '@angular/core/testing';

import { N8nussComponent } from './n8nuss.component';

describe('N8nussComponent', () => {
  let component: N8nussComponent;
  let fixture: ComponentFixture<N8nussComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [N8nussComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(N8nussComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
