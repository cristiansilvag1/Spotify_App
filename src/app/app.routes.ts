import { Routes } from '@angular/router';
import { IntroGuard } from './guards/intro-guard';
import { AuthGuard } from './guards/auth-guard'; 

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Siempre empezamos en el Login
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then( m => m.IntroPage),
    canActivate: [AuthGuard] // Solo si ya hizo login
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.page').then( m => m.MenuPage),
    canActivate: [AuthGuard, IntroGuard], // Requiere login E intro
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: '', 
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'songs-modal',
    loadComponent: () => import('./songs-modal/songs-modal.page').then( m => m.SongsModalPage)
  },
];