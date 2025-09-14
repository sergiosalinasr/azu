import { ComponentFixture, TestBed } from '@angular/core/testing';

import { N8nchatComponent } from './n8nchat.component';

describe('N8nchatComponent', () => {
  let component: N8nchatComponent;
  let fixture: ComponentFixture<N8nchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [N8nchatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(N8nchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
