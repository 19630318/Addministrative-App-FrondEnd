import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JefesComponent } from './jefes.component';

describe('JefesComponent', () => {
  let component: JefesComponent;
  let fixture: ComponentFixture<JefesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JefesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JefesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
