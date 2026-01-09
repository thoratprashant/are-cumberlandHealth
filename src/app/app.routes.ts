import { Routes } from '@angular/router';  

export const routes: Routes = [ 
{
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
    loadChildren: () =>  import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES),
  }, 
];
