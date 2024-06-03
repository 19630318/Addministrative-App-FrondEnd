import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { Injectable, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
//un Guardian es un servicio que implementa la interfaz CanActivate, que nos permite controlar el acceso a una ruta.
export const authGuard: CanActivateFn = (route, state) => {

  //Obtenemos los servicios que necesitamos y validamos lo que el Token y depende de lo que nos devuelva el servicio de 
  //TokenService retornamos true o false para que el usuario pueda acceder a la ruta o no.
  const tokenService = inject(TokenService)
  const router = inject(Router); 
  const isValidToken = tokenService.isValidToken();
  console.log('isValidToken auth', isValidToken);
  if (!isValidToken) {
    router.navigate(['/login'], { queryParams: { token: true } });
    return false;
  }

  return true;
  
};
