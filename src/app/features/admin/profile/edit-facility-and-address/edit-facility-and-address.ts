import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-facility-and-address',
  imports: [MatButtonModule, MatDialogModule,MatIconModule],
  templateUrl: './edit-facility-and-address.html',
  styleUrl: './edit-facility-and-address.scss',
})
export class EditFacilityAndAddress {

}
