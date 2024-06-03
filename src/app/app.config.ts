import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    //El provider de HttpClient se encarga de proveer el servicio de HttpClient con los interceptores que se le pasen como argumento
    provideHttpClient(withInterceptors([tokenInterceptor]))
  ]
};
