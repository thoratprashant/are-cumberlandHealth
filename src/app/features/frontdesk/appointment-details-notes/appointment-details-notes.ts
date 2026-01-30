import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, viewChild, QueryList, ViewChildren, ViewChild, ElementRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAccordion, MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { EditInsuranceDetailsModal } from './edit-insurance-details-modal/edit-insurance-details-modal';
import { RequestUpdateModal } from './request-update-modal/request-update-modal';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-appointment-details-notes',
  imports: [MatIconModule, CommonModule, MatButtonModule, MatDialogModule, MatCheckboxModule,
    MatTabsModule, MatAccordion, MatExpansionModule, RouterLink],
  templateUrl: './appointment-details-notes.html',
  styleUrl: './appointment-details-notes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentDetailsNotes {

  readonly dialog = inject(MatDialog);

  @ViewChild('cardAccordion', { static: false }) accordionRef!: ElementRef;
  accordionId = 'cardAccordion';

  ngAfterViewInit() { }

  editInsuranceOrCoverage() {
    this.dialog.open(EditInsuranceDetailsModal, {
      width: '610px',
      panelClass: 'modal--wrapper',
      autoFocus: false,
    });
  }

  requestUpdate() {
    this.dialog.open(RequestUpdateModal, {
      width: '610px',
      panelClass: 'modal--wrapper',
      autoFocus: false,
    });
  }
}
