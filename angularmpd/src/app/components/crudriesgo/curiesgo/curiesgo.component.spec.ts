import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuriesgoComponent } from './curiesgo.component';

describe('CuriesgoComponent', () => {
  let component: CuriesgoComponent;
  let fixture: ComponentFixture<CuriesgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuriesgoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuriesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
