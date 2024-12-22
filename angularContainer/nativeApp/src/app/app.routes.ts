import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full',
  },
  {
    path: 'loader',
    loadComponent: () => import('./pages/loader/loader.page').then( m => m.LoaderPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'venue',
    loadComponent: () => import('./pages/venue/venue.page').then( m => m.VenuePage)
  },
  {
    path: 'event',
    loadComponent: () => import('./pages/event/event.page').then( m => m.EventPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'countdown',
    loadComponent: () => import('./pages/countdown/countdown.page').then( m => m.CountdownPage)
  },
];
