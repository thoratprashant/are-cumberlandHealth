import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-personal-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatDialogModule,MatIconModule],
  templateUrl: './edit-personal-info.html',
  styleUrl: './edit-personal-info.scss',
})
export class EditPersonalInfo {

  /* Form Builder Injection */
  private fb = inject(FormBuilder);

  form = this.fb.group({
    firstName: ['', Validators.required],
    middleName: [''],
    lastName: ['', Validators.required]
  });

  constructor(
    private dialogRef: MatDialogRef<EditPersonalInfo>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.form.patchValue(data);
  }

}
