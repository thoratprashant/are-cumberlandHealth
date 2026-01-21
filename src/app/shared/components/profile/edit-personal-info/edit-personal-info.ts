import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { finalize } from 'rxjs';
import { UserApi } from '../../../../core/api-service/user.api';
import { ValidationRules } from '../../../../core/constants/validation.constants';
import { CommonService } from '../../../../core/helper/common.service';
import { lettersOnlyValidator } from '../../../../core/validators/letters-only.validator';
import { noTrimValidator } from '../../../../core/validators/no-trim.validator';
import { regex } from '../../../../utils/regex-patterns';
import { Messages, validationMessages } from '../../../../utils/validation-messages';
import { LettersOnlyDirective } from '../../../directives/letters-only.directive';

@Component({
  selector: 'app-edit-personal-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, MatIconModule, LettersOnlyDirective],
  templateUrl: './edit-personal-info.html',
  styleUrl: './edit-personal-info.scss',
})
export class EditPersonalInfo {

  readonly RULES = ValidationRules.NAME;

  validationMessages = validationMessages; // Expose validation messages to template
  message = Messages;
  regexPattern = regex;
  /* Form Builder Injection */
  private fb = inject(FormBuilder);

  form = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.maxLength(this.RULES.MAX_LENGTH),
        lettersOnlyValidator,
        noTrimValidator
      ]
    ],
    middleName: [
      '',
      [
        Validators.maxLength(this.RULES.MAX_LENGTH),
        lettersOnlyValidator
      ]
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.maxLength(this.RULES.MAX_LENGTH),
        lettersOnlyValidator,
        noTrimValidator
      ]
    ]
  });

  constructor(
    private dialogRef: MatDialogRef<EditPersonalInfo>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private userApi: UserApi,
    private commonService: CommonService
  ) {
    this.form.patchValue(data);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.commonService.showLoader();
    this.userApi.updateProfile(this.form.value as any).pipe(
      finalize(() => this.commonService.hideLoader())
    ).subscribe({
      next: (res: any) => {
        this.commonService.success(res.message || Messages.PROFILE.UPDATE_SUCCESS);
        setTimeout(() => {
          this.commonService.hideLoader();
          this.dialogRef.close(true); // ✅ notify parent
        }, 2000);

      },
      error: (error: Error) => {
        this.commonService.error(Messages.PROFILE.FETCH_FAILED);
      }
    });

  }

}
