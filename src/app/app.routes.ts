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
    loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES),
  },
  {
    path: 'admin',
    loadComponent: () => import('./layouts/admin-layout/admin-layout').then(c => c.AdminLayout),
    loadChildren: () => import('./features/admin/admin.routes').then(r => r.ADMINLAYOUT_ROUTES),
  },
  {
    path: 'frontdesk',
    loadComponent: () => import('./layouts/frontdesk-layout/frontdesk-layout').then(c => c.FrontdeskLayout),
    loadChildren: () => import('./features/frontdesk/frontdesk.routes').then(r => r.FRONTDESKLAYOUT_ROUTES),
  },
];
