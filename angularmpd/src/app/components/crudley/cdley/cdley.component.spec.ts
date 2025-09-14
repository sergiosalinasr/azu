import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdleyComponent } from './cdley.component';

describe('CdleyComponent', () => {
  let component: CdleyComponent;
  let fixture: ComponentFixture<CdleyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdleyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CdleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
