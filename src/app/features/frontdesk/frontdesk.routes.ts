import { Routes } from '@angular/router';

export const FRONTDESKLAYOUT_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./frontdesk-dashboard/frontdesk-dashboard').then(c => c.FrontdeskDashboard),
    data: { title: 'dashboard' }
  },
  {
    path: 'history',
    loadComponent: () => import('./frontdesk-history/frontdesk-history').then(c => c.FrontdeskHistory),
    data: { title: 'history' }
  },
];
