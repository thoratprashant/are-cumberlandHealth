import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-request-update-modal',
  imports: [MatButtonModule, MatDialogModule, MatIconModule, MatCheckboxModule],
  templateUrl: './request-update-modal.html',
  styleUrl: './request-update-modal.scss',
})
export class RequestUpdateModal {

}
