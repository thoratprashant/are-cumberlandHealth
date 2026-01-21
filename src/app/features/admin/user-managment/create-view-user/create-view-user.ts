import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AlertDialog } from '../../../../shared/components/comman/alert-dialog/alert-dialog';

@Component({
  selector: 'app-create-view-user',
  imports: [CommonModule,RouterLink ,MatButtonModule, MatDialogModule,MatIconModule,MatFormFieldModule, MatInputModule],
  templateUrl: './create-view-user.html',
  styleUrl: './create-view-user.scss',
})
export class CreateViewUser {
    readonly dialog = inject(MatDialog);
 
    submit() {
    this.dialog.open(AlertDialog, {
      width: '510px',
      panelClass: 'modal--wrapper',
      autoFocus: false,
      data: {
        title: 'User created successfully',
        message: 'An invitation link is sent to registered email ID',
        button1: 'Okay',
        button2: '',
        button3: '',
      }
    });
  }
}
