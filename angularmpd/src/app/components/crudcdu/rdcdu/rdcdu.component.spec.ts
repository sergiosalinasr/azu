import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdcduComponent } from './rdcdu.component';

describe('RdcduComponent', () => {
  let component: RdcduComponent;
  let fixture: ComponentFixture<RdcduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RdcduComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RdcduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
