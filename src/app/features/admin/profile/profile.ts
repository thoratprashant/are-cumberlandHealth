import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ChangePassword } from '../../comman/change-password/change-password';
import { EditPersonalInfo } from './edit-personal-info/edit-personal-info';

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

  editPersonalInfo() { 
    this.dialog.open(EditPersonalInfo, {
      width: '610px',
      panelClass: 'modal--wrapper',
      autoFocus: false
    });
  }

}
