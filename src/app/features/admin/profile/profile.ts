import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ChangePassword } from '../../comman/change-password/change-password';

@Component({
  selector: 'app-profile',
  imports: [MatIconModule,CommonModule,MatButtonModule,MatDialogModule ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

  readonly dialog = inject(MatDialog);

  changePassword() { 
    this.dialog.open(ChangePassword, {
      width: '610px',
      panelClass: 'modal--wrapper',
      autoFocus: false
    });
  }

}
