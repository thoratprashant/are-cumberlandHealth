import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { unauthGuard } from './core/guards/unauth.guard';

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
    canMatch: [unauthGuard]
  },
  /* ---------- SYSTEM ADMIN ---------- */
  {
    path: 'system-admin',
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout')
        .then(c => c.AdminLayout), // SAME layout
    loadChildren: () =>
      import('./features/admin/admin.routes')
        .then(r => r.ADMINLAYOUT_ROUTES), // SAME routes
    canMatch: [authGuard, roleGuard],
    data: { roles: ['SYSTEM_ADMIN'] }
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
