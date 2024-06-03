import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component'; 
import { RequestStatus } from '../../../models/request-status.models';
import { BussinessService } from '../../../services/bussiness.service';
import { Business } from '../../../models/bussiness.models';
import { Observable } from 'rxjs';
import { CategorieBusines } from '../../../models/ResponseCategoriesBussiness.models';
import { BusinessLine } from '../../../models/ResponseBusinessLine.model';

@Component({
  selector: 'app-dialog-new-empresa',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, CommonModule],
  templateUrl: './dialog-new-empresa.component.html'
})
export class DialogNewEmpresaComponent {

  private dialogRef = inject(DialogRef);
  private formBuilder = inject(FormBuilder);
  private bussinessService = inject(BussinessService);
  
  categoriesBusiness$: Observable<CategorieBusines[]> | undefined;	

  businessLine$: Observable<BusinessLine[]> | undefined;

  status: RequestStatus = 'init';
  error = '';

  ngOnInit() {
    this.categoriesBusiness$ = this.bussinessService.categoriesBusiness;
    this.businessLine$ = this.bussinessService.businessLine;
  }

  trackByFn(index: any, item: any): any {
    return item.uuid; 
  }

  form = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    rfc: ['', Validators.required],
    category: ['', Validators.required],
    busines_line: ['', Validators.required],
  });

  
  createBussiness() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, description, rfc, category, busines_line } = this.form.getRawValue();
      const newBusiness: Business = {
        name: name!,
        description: description!,
        rfc: rfc!,
        businessCategoryUuid: category!,
        businessLineUuid: busines_line!
      }
      this.bussinessService.createBussiness(newBusiness)
      .subscribe(
        {
          next: (bussiness)=>{
            this.status = 'success';
            this.dialogRef.close({  message: "create", status: true});
            console.log(bussiness);
          },
          error: (error)=>{
            this.status = 'failed';
            if (error.error.error.length === 0) {
              this.error = 'Error inesperado, intente mas tarde.';
            } else {
              this.error = error.error.error;
            }
            console.log(error.error.error);
          }
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }


  close() {
    this.dialogRef.close({ message: "", status: false});
  }

}
