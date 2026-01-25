import { Routes } from '@angular/router';
import { IntroGuard } from './guards/intro-guard';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    // El orden importa: 1. Vio intro, 2. Está logueado
    canActivate: [IntroGuard, AuthGuard]  
  },
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then( m => m.IntroPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
];