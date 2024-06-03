import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JefesDialogComponent } from './jefes-dialog.component';

describe('JefesDialogComponent', () => {
  let component: JefesDialogComponent;
  let fixture: ComponentFixture<JefesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JefesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JefesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
