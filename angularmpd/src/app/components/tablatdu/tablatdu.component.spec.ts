import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablatduComponent } from './tablatdu.component';

describe('TablatduComponent', () => {
  let component: TablatduComponent;
  let fixture: ComponentFixture<TablatduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablatduComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablatduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
