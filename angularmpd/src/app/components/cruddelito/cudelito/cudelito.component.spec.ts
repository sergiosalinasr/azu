import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CudelitoComponent } from './cudelito.component';

describe('CudelitoComponent', () => {
  let component: CudelitoComponent;
  let fixture: ComponentFixture<CudelitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CudelitoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CudelitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
