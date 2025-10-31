import { ComponentFixture, TestBed } from '@angular/core/testing';

import { N8nchatgptComponent } from './n8nchatgpt.component';

describe('N8nchatgptComponent', () => {
  let component: N8nchatgptComponent;
  let fixture: ComponentFixture<N8nchatgptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [N8nchatgptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(N8nchatgptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
