import { Routes } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { LayoutComponent } from './modules/layout/components/layout/layout.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { authGuard } from './guards/auth.guard';
import { redirectGuard } from './guards/redirect.guard';
import { HomeComponent } from './home/pages/home/home.component';


//Manejar rutas ya sea para redirigir a una pagina o para cargar un componente pero esta tiene hijos hereadados de la ruta padre para
//cargar componentes hijos.
export const routes: Routes = [
    {
        path: '',
        //El canActivate es un array de servicios que implementan la interfaz CanActivate, que nos permite controlar el acceso a una ruta.
        canActivate: [redirectGuard],
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                //loadComponent es una funcion que retorna una promesa que carga el componente de manera asincrona.
                loadComponent: () => import('./auth/pages/login/login.component').then(m => m.LoginComponent),
                title: 'Login'
            },
            {
                path: 'register',
                loadComponent: () => import('./auth/pages/register/register.component').then(m => m.RegisterComponent),
                title: 'Register'
            },
        ]
    },
    {
        path: 'app',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./modules/layout/components/layout/layout.component').then(m => m.LayoutComponent),
                children:[
                    {
                        path: '',
                        redirectTo: 'home',
                        pathMatch: 'full'
                    },
                    {
                        path: 'home',
                        canActivate: [authGuard],
                        loadComponent: () => import('./home/pages/home/home.component').then(m => m.HomeComponent),
                    },
                    {
                        path:'empresas',
                        canActivate: [authGuard],
                        loadComponent: () => import('./dashboard/pages/empresas/empresas.component').then(m => m.EmpresasComponent),
                    },
                    {
                        path:'trabajadores',
                        children:[
                            {
                                path:'jefes',
                                canActivate: [authGuard],
                                loadComponent: () => import('./dashboard/pages/trabajadores/jefes/jefes.component').then(m => m.JefesComponent),
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./home/pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    }
];
