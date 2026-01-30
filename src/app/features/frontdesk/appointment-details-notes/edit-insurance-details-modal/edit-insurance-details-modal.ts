import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-insurance-details-modal',
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './edit-insurance-details-modal.html',
  styleUrl: './edit-insurance-details-modal.scss',
})
export class EditInsuranceDetailsModal {

}
