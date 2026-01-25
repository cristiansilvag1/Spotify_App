import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { IntroGuard } from './guards/intro-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    // Primero verifica que haya visto la intro, luego que esté logueado
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
];