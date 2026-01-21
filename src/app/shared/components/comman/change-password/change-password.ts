import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthApi } from '../../../../core/api-service/auth/auth.api';
import { CommonService } from '../../../../core/helper/common.service';
import { OtpFlowService } from '../../../../core/services/otp-flow.service';
import { regex } from '../../../../utils/regex-patterns';
import { Messages, validationMessages } from '../../../../utils/validation-messages';
import { newPasswordDifferentValidator } from '../../../validators/new-password-different.validator';
import { passwordMatchValidator } from '../../../validators/password-match.validator';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule,  ReactiveFormsModule, MatButtonModule, MatDialogModule,MatIconModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword {

  private fb = inject(FormBuilder);
  readonly dialog = inject(MatDialog);

  validationMessages = validationMessages; // Expose validation messages to template
  message = Messages;
  regexPattern = regex;

  readonly PASSWORD_RULES = Messages.PASSWORD_RULES;
  showNewPassword = false;
  showConfirmPassword = false;
  showoldPassword = false;

  form = this.fb.group({
    oldPassword: ['', [Validators.required]],
    password: ['', [
      Validators.required,
      Validators.minLength(regex.PASSWORD_RULES.MIN_LENGTH_PASSWORD),
      Validators.minLength(8),
      Validators.maxLength(64),
      Validators.pattern(regex.PASSWORD_RULES.STRONG_PASSWORD)
    ]],
    confirmPassword: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(64)
    ]]
  }, {
    validators: [ passwordMatchValidator('password', 'confirmPassword'), newPasswordDifferentValidator('oldPassword', 'password')]
  });

  constructor(
    private commonService: CommonService,
    private authApi: AuthApi,
    private cd: ChangeDetectorRef,
    private otpFlow: OtpFlowService,
    private router: Router,
  ) {
    
  }

  toggleOldPassword(): void {
    this.showoldPassword = !this.showoldPassword;
  }

  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  submitChangePassword(){

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.commonService.showLoader();

    this.authApi.changePassword({
      oldPassword: this.form.value.oldPassword!,
      newPassword: this.form.value.password!
    }).pipe(
          finalize(() => this.commonService.hideLoader())
        )
      .subscribe({
        next: (res: any) => {
          this.commonService.success(this.message.AUTH.PASSWORD_CHANGED);
          this.dialog.closeAll();
        },
        error: (error) => {
          this.commonService.error(error.message);
        }
      });

    // this.dialog.open(AlertDialog, {
    //   width: '510px',
    //   panelClass: 'modal--wrapper',
    //   autoFocus: false,
    //   data: {
    //     title: 'Change Password',
    //     message: 'Where should we sent the Verification Code?',
    //     button1: 'Via Email',
    //     button2: 'Via Mobile',
    //     button3: '',
    //   }
    // });

  }
}
