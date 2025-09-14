import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuleyComponent } from './culey.component';

describe('CuleyComponent', () => {
  let component: CuleyComponent;
  let fixture: ComponentFixture<CuleyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuleyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
