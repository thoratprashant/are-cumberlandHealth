import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule,CommonModule,MatButtonModule,MatDialogModule,MatCheckboxModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  appointments = [
    {
      name: 'Sarah Mitchell',
      code: 'PS49201',
      reason: 'Annual physical examination',
      time: '9:30 AM',
      status: 'Ready',
      isBooked: true,
      avatar: 'images/users/avatar-2.jpg'
    },
    {
      name: 'David Chen ',
      code: 'SW987458',
      reason: 'Follow-up: Hypertension management',
      time: '9:32 AM',
      status: 'Ready',
      isBooked: false,
      avatar: 'images/users/avatar-1.jpg'
    },
    {
      name: 'Emma Rodriguez',
      code: 'RT258963',
      reason: 'Consultation: Persistent headaches',
      time: '9:35 AM',
      status: 'Waiting..',
      isBooked: false,
      avatar: 'images/users/avatar-3.jpg'
    },
        {
      name: 'James Patterson',
      code: 'PS214587',
      reason: 'New patient: General consultation',
      time: '9:38 AM',
      status: 'Waiting..',
      isBooked: false,
      avatar: 'images/users/avatar-4.jpg'
    }
  ];


}
