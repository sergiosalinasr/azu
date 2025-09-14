import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutduComponent } from './cutdu.component';

describe('CutduComponent', () => {
  let component: CutduComponent;
  let fixture: ComponentFixture<CutduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CutduComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CutduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
