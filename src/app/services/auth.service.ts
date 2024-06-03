import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User, UserCreateDto } from '../models/user.models';
import { TokenService } from './token.service';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { Data, ResponseLogin } from '../models/auth-response.models';
import { checkToken } from '../interceptors/token.interceptor';
import { BossCreateDto } from '../models/boss.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //El servicio HttpClient se inyecta en el constructor de la clase AuthService para poder hacer peticiones HTTP.
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  //La variable apiUrl contiene la URL de la API.
  apiUrl = environment.API_URL;

  //El BehaviorSubject user$ es un observable que emite el usuario actual. El BehaviorSubject es un tipo de observable que 
  //emite el último valor emitido.
  user$ = new BehaviorSubject<Data | null>(null);

  constructor() { }

  //El método login() hace una petición POST a la API para iniciar sesión.
  login(email: string, password: string){
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/login/boss/`, { ///api/test/users/login
      email, password
      //El método pipe() permite encadenar operadores de RxJS.
    }).pipe(
      //El operador tap() permite realizar acciones secundarias con los datos que fluyen a través de un observable.
      tap(response => {
        //El método next() del BehaviorSubject user$ emite el usuario que ha iniciado sesión.
        this.tokenService.saveUser(response.data.uuid);
        //El método saveToken() del servicio TokenService guarda el token de acceso en una cookie.
        this.tokenService.saveToken(response.data.token);
      })
    );
  }

  register(user: BossCreateDto){
    return this.http.post(`${this.apiUrl}/api/v1/bosses/create-boss/`, {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      phone: user.phone
    }).pipe(
      //El operador switchMap() permite cambiar el observable de salida, independientemente de si el observable de entrada emite un valor.
      switchMap(()=> this.login(user.email, user.password))
    );
  }

  getProfile(){
    //El método getUser() del servicio TokenService obtiene el UUID del usuario que ha iniciado sesión guardado en una cookie.
    //const uuid = this.tokenService.getUser();
    //console.log('uuid', uuid);
    return this.http.get<ResponseLogin>(`${this.apiUrl}/api/v1/bosses/get-my-boss/`, {
      context: checkToken()
    }).pipe(
      tap(response => {
        //El método next() del BehaviorSubject user$ emite el usuario que ha iniciado sesión.
        this.user$.next(response.data);
      })
    );
  }

  logOut(){
    this.tokenService.removeToken();
    this.tokenService.removeUser();
  }

}
