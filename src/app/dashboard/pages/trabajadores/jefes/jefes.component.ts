import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BossesService } from '../../../../services/bosses.service';
import { Boss } from '../../../../models/boss.model'
import { DialogLoadingComponent } from '../../../../shared/components/dialog-loading/dialog-loading.component';
import { Bosses } from '../../../../models/get-bosses-response.models';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { GridApi, ColDef, RowModelType, IGetRowsParams } from 'ag-grid-community'; // Column Definition Type Interface
import { JefesDialogComponent } from './jefes-dialog/jefes-dialog.component';

@Component({
  selector: 'app-jefes',
  standalone: true,
  imports: [ButtonComponent, FontAwesomeModule, CommonModule, ReactiveFormsModule, DialogLoadingComponent, AgGridAngular],
  templateUrl: './jefes.component.html',
  styleUrl: './jefes.component.css'
})
export class JefesComponent {

  private title = inject(Title);
  private dialog = inject(Dialog);
  private bussinessService = inject(BossesService);
  private formBuilder = inject(FormBuilder);  



  faSearch = faSearch;
  status: boolean | unknown;
  bosses: Boss[] = [];
  message: string | undefined;
  form: any
  filteredBusinesses: Boss[] = [];
  loading: boolean | undefined = false;

  getBosses: any

  getBosses$: Observable<Bosses[]> | undefined;  

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 90,
  };
  rowModelType: RowModelType = "infinite";
  paginationPageSize = 10;
  cacheBlockSize = 10;
  pagination = true;
  paginationPageSizeSelector = [10, 20, 50];

  gridApi: GridApi | undefined;

  ngOnInit(){
    this.title.setTitle('Jefes');
    this.loading = false;
    this.getBosses$ = this.bussinessService.allBosses;
    this.getBosses$.subscribe((boss) => {
      this.getBosses = boss;
      //this.filteredBusinesses = businesses;
      this.loading = true;
    });
    this.form = this.formBuilder.group({
      search: ['']
    });
  }

  colDefs: ColDef[] = [
    { field: "name" },
    { field: "lastname" },
    { field: "email" },
    { field: "phone" },
    { field: "createdAt" }
  ];

  onGridReady(params: any){
    console.log('Params ',params);
    this.gridApi = params.api;
    const datasource = {
      getRows: (params: any) => {
        const page = params.startRow / this.cacheBlockSize;
        console.log('Pagina: ',page);
        this.bussinessService.getBossesAllPagination(page)
          .subscribe(data => {
            params.successCallback(data.data.data, data.data.total);
          });
      }
    };
    this.gridApi!.setGridOption("datasource", datasource);
  }

  openDialogUpdate(){

  }

  openDialog(){
    const dialogRef = this.dialog.open(JefesDialogComponent,{
      minWidth: '300px',
      maxWidth: '50%',
    });
    dialogRef.closed.subscribe((result: any) => {
      this.status = result.status;
    });
  }

}
