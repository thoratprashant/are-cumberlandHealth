import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ChangeEmail } from '../../../shared/components/comman/change-email/change-email';
import { ChangePassword } from '../../../shared/components/comman/change-password/change-password';
import { ChangePhoneNumber } from '../../../shared/components/comman/change-phone-number/change-phone-number';
import { EditPersonalInfo } from './edit-personal-info/edit-personal-info';

@Component({
  selector: 'app-profile',
  imports: [MatIconModule,CommonModule,MatButtonModule,MatDialogModule,MatCheckboxModule ],
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

  // alert() {
  //   this.dialog.open(AlertDialog, {
  //     width: '510px',
  //     panelClass: 'modal--wrapper',
  //     autoFocus: false,
  //     data: {
  //       title: 'Warning',
  //       message: 'Are you sure you would like to proceed with this?',
  //       button1: 'Yes',
  //       button2: 'May be',
  //       button3: 'No',
  //     }
  //   });
  // }
  changeEmail() {
    this.dialog.open(ChangeEmail, {
      width: '510px',
      panelClass: 'modal--wrapper',
      autoFocus: false, 
    });
  }
  changePhoneNumber() {
    this.dialog.open(ChangePhoneNumber, {
      width: '510px',
      panelClass: 'modal--wrapper',
      autoFocus: false, 
    });
  }

  

}
