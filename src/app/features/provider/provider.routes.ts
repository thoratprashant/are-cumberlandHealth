import { Routes } from '@angular/router'; 

export const PROVIDERLAYOUT_ROUTES: Routes = [
  {
    path: 'history',
    loadComponent: () => import('./history/history').then(c => c.History),
    data: { title: 'history' }
  },  
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then(c => c.Dashboard),
    data: { title: 'history' }
  },  
];
 