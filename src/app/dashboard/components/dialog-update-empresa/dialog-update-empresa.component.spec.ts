import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateEmpresaComponent } from './dialog-update-empresa.component';

describe('DialogUpdateEmpresaComponent', () => {
  let component: DialogUpdateEmpresaComponent;
  let fixture: ComponentFixture<DialogUpdateEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUpdateEmpresaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogUpdateEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
