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
  {
    path: 'notifications',
    loadComponent: () => import('../comman/notifications/notifications').then(c => c.Notifications),
    data: { title: 'notifications' }
  },
  {
    path: 'appointment-details',
    loadComponent: () => import('./appointment-details-notes/appointment-details-notes').then(c => c.AppointmentDetailsNotes),
    data: { title: 'appointment-details' }
  },
];
