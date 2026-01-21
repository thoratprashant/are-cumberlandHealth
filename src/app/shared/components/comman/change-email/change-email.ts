import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { regex } from '../../../../utils/regex-patterns';
import { Messages } from '../../../../utils/validation-messages';
import { VerificationCodeDialog } from '../verification-code-dialog/verification-code-dialog';

@Component({
  selector: 'app-change-email',
  imports: [CommonModule,  ReactiveFormsModule, MatDialogModule, MatButtonModule,MatIconModule],
  templateUrl: './change-email.html',
  styleUrl: './change-email.scss',
})
export class ChangeEmail {
  readonly dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  message = Messages;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(regex.EMAIL)]]
  });

   constructor(
    private dialogRef: MatDialogRef<ChangeEmail>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.form.patchValue(data);
  }

  verificationCode(){
    this.dialog.open(VerificationCodeDialog, {
      width: '510px',
      panelClass: 'modal--wrapper',
      autoFocus: false, 
      data: { type: 'EMAIL', value: this.form.get('email')?.value }
    });
  }
 
}
