import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Business } from '../models/bussiness.models';
import { checkToken } from '../interceptors/token.interceptor';
import { environment } from '../../environments/environment';
import { ResponseBusiness } from '../models/bussines-response.model';
import { CategorieBusines, ResponseCategoriesBusiness } from '../models/ResponseCategoriesBussiness.models';
import { BusinessLine, ResponseBusinessLine } from '../models/ResponseBusinessLine.model';
import { Observable, Subject, map, shareReplay, startWith, switchMap } from 'rxjs';

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class BussinessService {

  constructor() { }

  private http = inject(HttpClient);
  apiUrl = environment.API_URL;

  private cacheCategoriesBusiness$: Observable<Array<CategorieBusines>> | undefined;

  private cacheBusinessLine$: Observable<Array<BusinessLine>> | undefined;

  // El cacheGetBusiness$ es un observable que se encarga de obtener los datos de la empresa
  private cacheGetBusiness$: Observable<Array<Business>> | undefined;

  private refresh$ = new Subject<void>();

  get categoriesBusiness() {
    if (!this.cacheCategoriesBusiness$) {
      this.cacheCategoriesBusiness$ = this.getAllCategoriesBusiness().pipe(
        shareReplay(CACHE_SIZE)
      );
    }
    return this.cacheCategoriesBusiness$;
  }

  get businessLine() {
    if (!this.cacheBusinessLine$) {
      this.cacheBusinessLine$ = this.getAllBusinessLine().pipe(
        // El shareReplay se encarga de compartir los datos en el cache y emitirlos
        shareReplay(CACHE_SIZE)
      );
    }
    return this.cacheBusinessLine$;
  }

  // El getBusiness$ es un observable que se encarga de obtener los datos de la empresa
  get getBusiness() {
    // El refresh$ es un observable que se encarga de refrescar los datos de la empresa
    //El pipe se encarga de emitir un valor inmediatamente para iniciar el pipe y luego se encarga de obtener los datos de la empresa
    return this.refresh$.pipe(
      // El startWith(null) emite un valor inmediatamente para iniciar el pipe
      startWith(null), 
      // El switchMap se encarga de obtener los datos de la empresa y compartirlos en el cache
      switchMap(() => this.getBussiness().pipe(
        // El shareReplay se encarga de compartir los datos en el cache y emitirlos
        shareReplay(CACHE_SIZE)
      ))
    );
  }

  // El refresh$ se encarga de refrescar los datos de la empresa
  refreshBussiness() {
    // El next se encarga de emitir un valor para iniciar el pipe
    this.refresh$.next();
  }

  createBussiness(bussiness: Business) {
    console.log('Datos para crear ', bussiness);
    return this.http.post(`${this.apiUrl}/api/v1/businesses/create-business/`, {
      name: bussiness.name,
      description: bussiness.description,
      active: bussiness.active ? bussiness.active : true,
      rfc: bussiness.rfc,
      businessCategoryUuid: bussiness.businessCategoryUuid,
      businessLineUuid: bussiness.businessLineUuid
    }, {
      context: checkToken()
    });
  }

  getBussiness(){
    return this.http.get<ResponseBusiness>(`${this.apiUrl}/api/v1/businesses/get-all-businesses/`, {
      context: checkToken()
    }).pipe(
      map((response) => response.data.data)
    );
  }

  getAllBusinessLine(){
    return this.http.get<ResponseBusinessLine>(`${this.apiUrl}/api/v1/business-lines/get-all-business-lines/`, {
      context: checkToken()
    }).pipe(
      map((response) => response.data.data)
    );
  }

  getAllCategoriesBusiness(){
    return this.http.get<ResponseCategoriesBusiness>(`${this.apiUrl}/api/v1/business-categories/get-all-business-categories/`, {
      context: checkToken()
    }).pipe(
      map((response) => response.data.data)
    );
  }

  deleteBussiness(uuid: string){
    return this.http.delete(`${this.apiUrl}/api/v1/businesses/delete-business/${uuid}`, {
      context: checkToken()
    });
  }

  updateBussiness(uuid: string, bussiness: Business){
    console.log('Datos para actualizar ',uuid, bussiness);
    return this.http.put(`${this.apiUrl}/api/v1/businesses/update-business/${uuid}`, {
      name: bussiness.name,
      description: bussiness.description,
      active: bussiness.active,
      rfc: bussiness.rfc,
      businessCategoryUuid: bussiness.businessCategoryUuid,
      businessLineUuid: bussiness.businessLineUuid
    }, {
      context: checkToken()
    });
  }

}
