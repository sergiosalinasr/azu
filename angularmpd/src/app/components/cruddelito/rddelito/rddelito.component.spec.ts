import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RddelitoComponent } from './rddelito.component';

describe('RddelitoComponent', () => {
  let component: RddelitoComponent;
  let fixture: ComponentFixture<RddelitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RddelitoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RddelitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
