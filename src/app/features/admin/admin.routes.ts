import { Routes } from '@angular/router';

export const ADMINLAYOUT_ROUTES: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('../../shared/components/profile/profile').then(c => c.Profile),
    data: { title: 'profile' }
  }, 
  {
    path: 'user-managment',
    loadComponent: () => import('./user-managment/user-managment-listing/user-managment-listing').then(c => c.UserManagmentListing), 
  },
  {
    path: 'create-user',
    loadComponent: () => import('./user-managment/create-view-user/create-view-user').then(c => c.CreateViewUser), 
  },
  {
    path: 'patients',
    loadComponent: () => import('./patients/patients').then(c => c.Patients), 
  },
];
 