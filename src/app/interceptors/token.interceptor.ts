import { HttpContext, HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';


//HttpContextToken es un token que se puede usar para inyectar un valor en el contexto de una solicitud.
const CHECK_TOKEN = new HttpContextToken<boolean>(()=>false);
//El método checkToken() devuelve un nuevo contexto de solicitud con el token CHECK_TOKEN
export function checkToken(){
  return new HttpContext().set(CHECK_TOKEN, true);
}

//El método tokenInterceptor() es un interceptor que se encarga de agregar el token de acceso a la cabecera de la solicitud.
export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const tokenService = inject(TokenService);
  const authServices = inject(AuthService);

  console.log('Interceptor', request.context.get(CHECK_TOKEN));
  if(request.context.get(CHECK_TOKEN)){// Con el request.context.get(CHECK_TOKEN) obtenemos el valor del token CHECK_TOKEN si es true
    const isValidToken = tokenService.isValidToken(); //AccessToken
    if(isValidToken){//Si el token es valido
      const accessToken = tokenService.getToken();//Obtenemos el token de acceso
      if(accessToken){//Si el token de acceso existe
        //Clonamos la solicitud y le agregamos el token de acceso a la cabecera
        const authRequest = request.clone({
          //El método set() devuelve una copia de la solicitud con un nuevo encabezado de solicitud que contiene el valor y el nombre especificados.
          headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
        });
        console.log('Token de acceso', accessToken);
        //Retornamos la solicitud con el token de acceso
        return next(authRequest);
      }
      //Si el token de acceso no existe retornamos la solicitud sin el token de acceso
      console.log('Token de acceso no existe');
      return next(request);
    }
  }
  //Si el token no es valido retornamos la solicitud sin el token de acceso
  console.log('Token no valido');
  return next(request);
};


