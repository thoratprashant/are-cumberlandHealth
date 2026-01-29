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
  {
    path: 'provider',
    loadComponent: () => import('./layouts/provider-layout/provider-layout').then(c => c.ProviderLayout),
    loadChildren: () => import('./features/provider/provider.routes').then(r => r.PROVIDERLAYOUT_ROUTES),
  },
  {
    path: 'video-chat',
    loadComponent: () => import('./layouts/video-chat-layout/video-chat-layout').then(c => c.VideochatLayout),
    loadChildren: () => import('./features/video-chat/video-chat.routes').then(r => r.VIDEOCHATLAYOUT_ROUTES),
  },
];
