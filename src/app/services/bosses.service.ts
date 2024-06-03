import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Bosses, ResponseBosses } from '../models/get-bosses-response.models';
import { Boss, BossCreateDto } from '../models/boss.model';
import { Observable, Subject, map, shareReplay } from 'rxjs';
import { checkToken } from '../interceptors/token.interceptor';

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class BossesService {

  private http = inject(HttpClient);

  apiUrl = environment.API_URL;  

  constructor() { }

  private cacheGetBosses$: Observable<Array<Bosses>> | undefined;

  private refresh$ = new Subject<void>();

  get allBosses() {
    if (!this.cacheGetBosses$) {
      this.cacheGetBosses$ = this.getBossesAll().pipe(
        shareReplay(CACHE_SIZE)
      );
    }
    return this.cacheGetBosses$;
  }

  getBossesAll(){
    return this.http.get<ResponseBosses>(`${this.apiUrl}/api/v1/bosses/get-all-bosss/`, {
      context: checkToken()
    }).pipe(
      map((response) => response.data.data)
    )
  }

  getBossesAllPagination(page: any){
    return this.http.get<ResponseBosses>(`${this.apiUrl}/api/v1/bosses/get-all-bosss/?page=${page}`, {
      context: checkToken()
    }
    )
  }

  createUser(boss: BossCreateDto){
    return this.http.post(`${this.apiUrl}/api/v1/bosses/create/bosses`,{
      name: boss.name,
      lastname: boss.lastname,
      email: boss.email,
      password: boss.password,
      phone: boss.phone
    });
  }


}
