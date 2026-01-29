import { Routes } from '@angular/router'; 

export const VIDEOCHATLAYOUT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./video-chat/video-chat').then(c => c.VideoChat), 
  },   
];
 