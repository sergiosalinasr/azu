import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablacduComponent } from './tablacdu.component';

describe('TablacduComponent', () => {
  let component: TablacduComponent;
  let fixture: ComponentFixture<TablacduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablacduComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablacduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
