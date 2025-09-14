import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdtduComponent } from './rdtdu.component';

describe('RdtduComponent', () => {
  let component: RdtduComponent;
  let fixture: ComponentFixture<RdtduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RdtduComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RdtduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
