import { ComponentFixture, TestBed } from '@angular/core/testing';

import { N8nmutComponent } from './n8nmut.component';

describe('N8nmutComponent', () => {
  let component: N8nmutComponent;
  let fixture: ComponentFixture<N8nmutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [N8nmutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(N8nmutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
