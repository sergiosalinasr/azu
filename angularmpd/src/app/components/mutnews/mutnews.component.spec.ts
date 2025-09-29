import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutnewsComponent } from './mutnews.component';

describe('MutnewsComponent', () => {
  let component: MutnewsComponent;
  let fixture: ComponentFixture<MutnewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MutnewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MutnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
