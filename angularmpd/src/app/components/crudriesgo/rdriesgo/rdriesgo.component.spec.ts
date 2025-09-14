import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdriesgoComponent } from './rdriesgo.component';

describe('RdriesgoComponent', () => {
  let component: RdriesgoComponent;
  let fixture: ComponentFixture<RdriesgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RdriesgoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RdriesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
