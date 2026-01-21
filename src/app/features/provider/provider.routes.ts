import { Routes } from '@angular/router'; 

export const PROVIDERLAYOUT_ROUTES: Routes = [
  {
    path: 'history',
    loadComponent: () => import('./history/history').then(c => c.History),
    data: { title: 'history' }
  },  
];
 