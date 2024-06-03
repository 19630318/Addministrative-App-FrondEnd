import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ButtonComponent } from '../../../shared/components/button/button.component'; 
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { DialogNewEmpresaComponent } from '../../components/dialog-new-empresa/dialog-new-empresa.component';
import { BussinessService } from '../../../services/bussiness.service';
import { Business } from '../../../models/bussiness.models';
import { DialogUpdateEmpresaComponent } from '../../components/dialog-update-empresa/dialog-update-empresa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogLoadingComponent } from '../../../shared/components/dialog-loading/dialog-loading.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [ButtonComponent, FontAwesomeModule, CommonModule, ReactiveFormsModule, DialogLoadingComponent],
  templateUrl: './empresas.component.html'
})
export class EmpresasComponent {

  private title = inject(Title);
  private dialog = inject(Dialog);
  private bussinessService = inject(BussinessService);
  private formBuilder = inject(FormBuilder);  

  faSearch = faSearch;
  status: boolean | unknown;
  businesses: Business[] = [];
  message: string | undefined;
  form: any
  filteredBusinesses: Business[] = [];
  loading: boolean | undefined = false;

  getBusiness$: Observable<Business[]> | undefined;  

  ngOnInit() {
    this.title.setTitle('Empresas');
    this.loading = false;
    this.getBusiness$ = this.bussinessService.getBusiness;
    this.getBusiness$.subscribe((businesses) => {
      this.businesses = businesses;
      this.filteredBusinesses = businesses;
      this.loading = true;
    });
    this.form = this.formBuilder.nonNullable.group({
      search: ['']
    });
    this.form.get('search')?.valueChanges.subscribe((value: any) => {
      if (value) {
          this.filteredBusinesses = this.businesses.filter((business) => {
              return business.name.toLowerCase().includes(value.toLowerCase());
          });
      } else {
          this.filteredBusinesses = this.businesses;
      }

    });
  }

  ngOnDestroy() {
  }

  refreshAllBusinesses(){
    this.bussinessService.refreshBussiness();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogNewEmpresaComponent,{
      minWidth: '300px',
      maxWidth: '50%',
    });
    dialogRef.closed.subscribe((result: any) => {
      this.status = result.status;
        if (result.message === 'create') {
          this.message = 'Empresa creada correctamente';
          this.refreshAllBusinesses();
          console.log('Se actualixo las empresas, result');
        }else {
          this.message = 'Error inesperado, intente mas tarde.';
        }
      setTimeout(() => {
        this.status = false;
        console.log('Dialog closed', result);
      }, 4000);
      console.log('Dialog closed', result);
    });
  }

  openDialogUpdate(business: Business) {
    console.log('Business', business);
    console.log('Status', business.active);
    const dialogRef = this.dialog.open(DialogUpdateEmpresaComponent,{
      minWidth: '300px',
      maxWidth: '50%',
      data: business
    });
    dialogRef.closed.subscribe((result:any) => {
      this.status = result.status;
      switch (result.message) {
        case 'update':
          this.message = 'Empresa actualizada correctamente';
          this.refreshAllBusinesses();
          break;
        case 'delete':
          this.message = 'Empresa se inactivo correctamente';
          this.refreshAllBusinesses();
          break;
        default:
          this.message = 'Error inesperado, intente mas tarde.';
          break;
      }
      setTimeout(() => {
        this.status = false;
        console.log('Dialog closed', result);
      }, 4000);
      console.log('Dialog closed', result);
    });
  }

}
