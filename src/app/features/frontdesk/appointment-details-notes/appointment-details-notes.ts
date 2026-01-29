import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'; 
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-appointment-details-notes',
  imports: [  MatIconModule, CommonModule, MatButtonModule, MatDialogModule, MatCheckboxModule, MatTabsModule, MatExpansionModule],
  templateUrl: './appointment-details-notes.html',
  styleUrl: './appointment-details-notes.scss',
})
export class AppointmentDetailsNotes {

}
