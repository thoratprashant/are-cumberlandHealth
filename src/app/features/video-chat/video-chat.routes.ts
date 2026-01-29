import { Routes } from '@angular/router'; 

export const VIDEOCHATLAYOUT_ROUTES: Routes = [
  {
    path: 'video-chat',
    loadComponent: () => import('./video-chat/video-chat').then(c => c.VideoChat),
    data: { title: 'history' }
  },   
];
 