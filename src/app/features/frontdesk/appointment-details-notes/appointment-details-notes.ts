import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, viewChild, QueryList, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAccordion, MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-appointment-details-notes',
  imports: [MatIconModule, CommonModule, MatButtonModule, MatDialogModule, MatCheckboxModule, 
    MatTabsModule, MatAccordion, MatExpansionModule],
  templateUrl: './appointment-details-notes.html',
  styleUrl: './appointment-details-notes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentDetailsNotes {

  @ViewChild('cardAccordion', { static: false }) accordionRef!: ElementRef;

  accordionId = 'cardAccordion';


  ngAfterViewInit() {

  }
}
