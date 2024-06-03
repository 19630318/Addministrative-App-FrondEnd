import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef, DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { ButtonComponent } from '../../../shared/components/button/button.component'; 
import { RequestStatus } from '../../../models/request-status.models';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BussinessService } from '../../../services/bussiness.service';
import { BusinessDto } from '../../../shared/dto/bussines.dto';
import { Business } from '../../../models/bussiness.models';
import { CategorieBusines } from '../../../models/ResponseCategoriesBussiness.models';
import { Observable } from 'rxjs';
import { BusinessLine } from '../../../models/ResponseBusinessLine.model';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-dialog-update-empresa',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './dialog-update-empresa.component.html'
})
export class DialogUpdateEmpresaComponent {

  private dialogRef = inject(DialogRef);
  private dialog = inject(Dialog);
  private formBuilder = inject(FormBuilder);
  private bussinessService = inject(BussinessService);
  bandera: boolean | undefined = false;
  
  categoriesBusiness$: Observable<CategorieBusines[]> | undefined;

  businessLine$: Observable<BusinessLine[]> | undefined;

  constructor(@Inject(DIALOG_DATA) public data: BusinessDto) {
    this.bandera = this.data.active;
  }

  ngOnInit() {
    this.categoriesBusiness$ = this.bussinessService.categoriesBusiness;
    this.businessLine$ = this.bussinessService.businessLine;
  }

  trackByFn(index: any, item: any): any {
    return item.uuid; 
  }

  status: RequestStatus = 'init';
  error = '';
  
  form = this.formBuilder.group({
    name: [this.data.name || '', Validators.required],
    description: [this.data.description, Validators.required],
    active: [this.data.active, Validators.required],
    rfc: [this.data.rfc, Validators.required],
    category: [this.data.businessCategoryUuid, Validators.required],
    busines_line: [this.data.businessLineUuid, Validators.required],
  });


  updateBussiness() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, description, active, rfc, category, busines_line } = this.form.getRawValue();
      const newBusiness: Business = {
        name: name!,
        description: description!,
        active: active!,
        rfc: rfc!,
        businessCategoryUuid: category!,
        businessLineUuid: busines_line!
      }
      this.bussinessService.updateBussiness(this.data.uuid!, newBusiness).subscribe(
        {
          next: (bussiness)=>{
            this.status = 'success';
            this.dialogRef.close({ message: "update", status: true});
          },
          error: (error)=>{
            this.status = 'failed';
            if (error.error.error.length === 0) {
              this.error = 'Error inesperado, intente mas tarde.';
            } else {
              this.error = error.error.error;
            }
          }
        }
      );
      
    } else {
      this.status = 'failed';
    }
  }
  deleteBussines(){
    const dialogRef = this.dialog.open(DialogComponent,{
      minWidth: '200px',
      maxWidth: '250px',
      data: {
        title: "Eliminar Empresa",
        titleButton: "Eliminar",
        message: "¿Estas seguro de eliminar esta empresa?"
      }
    });
    dialogRef.closed.subscribe((result: any) => {
      if (result.message === 'delete') {
        this.bussinessService.deleteBussiness(this.data.uuid!).subscribe({
          next: (data) => {
            this.dialogRef.close({ message: "delete", status: true});
          },
          error: (error) => {
            this.dialogRef.close({ message: "delete", status: false});
          }
        });
      }
    });
  }

  close() {
    this.dialogRef.close({  message: "", status: false});
  }

}
