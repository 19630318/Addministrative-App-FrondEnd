import { Injectable, inject } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { DateResponse } from '../models/date-response.models';
import { environment } from '../../environments/environment';
import { checkToken } from '../interceptors/token.interceptor';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private http = inject(HttpClient);
  apiUrl = environment.API_URL;
  dateServerNow = 0;

  constructor() {
    
   }

  saveToken(token: string){
    setCookie('token', token, { expires: 10, path: '/' });
  }

  saveUser(user: string){
    setCookie('user', user);
  }

  getToken(){
    const token = getCookie('token');
    return token;
  }

  getUser(){
    const user = getCookie('user');
    return user;
  }

  removeToken(){
    removeCookie('token');
  }

  removeUser(){
    removeCookie('user');
  }

  getDateServer(){
    return this.http.get<DateResponse>(`${this.apiUrl}/api/v1/server/date/time-now?`, {
      context: checkToken()
    }).pipe(
      tap(response => {
        this.dateServerNow = response.data.dateNumber;
        console.log('dateServerNow', this.dateServerNow);
      })
    )
  }

  saveRefreshToken(token: string){
    setCookie('refresh-token', token, { expires: 10, path: '/' });
  }

  getRefreshToken(){
    const token = getCookie('refresh-token');
    return token;
  }

  removeRefreshToken(){
    removeCookie('refresh-token');
  }

  isValidToken(): boolean{
      const token = this.getToken();
      if (!token) {
          return false;
      }
      const decodeToken = jwtDecode<JwtPayload>(token);
        if (decodeToken && decodeToken.exp) {
          const tokenDate = new Date(0);
          tokenDate.setUTCSeconds(decodeToken.exp);
          const tokenServer = new Date();
          //console.log('sE LLAMO UNA SIDUGYHBUIYHWDEBIYHUEFWBI');
          console.log('tokenDate', tokenDate);
          console.log('tokenServer', tokenServer);
          return tokenDate.getTime() > tokenServer.getTime();
      }
      return false;
  }

  isValidToken2(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const token = this.getToken();
      if (!token) {
        observer.next(false);
        observer.complete();
      } else {
        this.getDateServer().subscribe(response => {
          const decodeToken = jwtDecode<JwtPayload>(token);
          if (decodeToken && decodeToken.exp) {
            const tokenDate = new Date(0);
            tokenDate.setUTCSeconds(decodeToken.exp);
            const tokenServer = new Date(0);
            tokenServer.setUTCSeconds(response.data.dateNumber);
            console.log('tokenDate', (tokenDate.getTime() > tokenServer.getTime()));
            observer.next(tokenDate.getTime() > tokenServer.getTime());
          } else {
            observer.next(false);
          }
          observer.complete();
        });
      }
    });
  }

  isValidRefreshToken(){
    const token = this.getRefreshToken();
    if(!token){
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp){
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken?.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false
  }

}
