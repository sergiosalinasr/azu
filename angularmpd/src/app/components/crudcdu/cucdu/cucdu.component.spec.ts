import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CucduComponent } from './cucdu.component';

describe('CucduComponent', () => {
  let component: CucduComponent;
  let fixture: ComponentFixture<CucduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CucduComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CucduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
