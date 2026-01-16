import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-frontdesk-dashboard',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './frontdesk-dashboard.html',
  styleUrl: './frontdesk-dashboard.scss',
})
export class FrontdeskDashboard {

}
