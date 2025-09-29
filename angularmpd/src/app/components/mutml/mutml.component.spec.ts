import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutmlComponent } from './mutml.component';

describe('MutmlComponent', () => {
  let component: MutmlComponent;
  let fixture: ComponentFixture<MutmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MutmlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MutmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
