import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewEmpresaComponent } from './dialog-new-empresa.component';

describe('DialogNewEmpresaComponent', () => {
  let component: DialogNewEmpresaComponent;
  let fixture: ComponentFixture<DialogNewEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogNewEmpresaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogNewEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
