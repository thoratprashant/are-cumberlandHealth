import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthApi } from '../../../core/api-service/auth/auth.api';
import { CommonService } from '../../../core/helper/common.service';
import { UserNameIdentifierDirective } from '../../../shared/directives/identifier.directive';
import { NumbersOnlyDirective } from '../../../shared/directives/numbers-only.directive';
import { ShowErrorPipe } from '../../../shared/pipes/show-error.pipe';
import { OtpFlowService } from '../../../shared/services/otp-flow.service';
import { emailOrMobileValidator } from '../../../shared/validators/email-or-mobile.validator';
import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';
import { regex } from '../../../utils/regex-patterns';
import { Messages, validationMessages } from '../../../utils/validation-messages';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, ShowErrorPipe, MatButtonModule, MatIconModule, NumbersOnlyDirective, UserNameIdentifierDirective],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPasswordComponent {

  validationMessages = validationMessages; // Expose validation messages to template
  message = Messages;
  regexPattern = regex;
  otpTimer$!: Observable<number>;
  canResend$!: Observable<boolean>;
  otpExpired$!: Observable<boolean>;
  isPhoneMode = false;
  showNewPassword = false;
  showConfirmPassword = false;


  authStep: 'OTP' | 'FORGOT_PASSWORD' | 'RESET_PASSWORD' = 'FORGOT_PASSWORD';

  /* Form Builder Injection */
  private fb = inject(FormBuilder);

  /** forgot password form (email / mobile) */
  forgotPasswordForm = this.fb.group({
    username: ['', emailOrMobileValidator()]
  });

  /* OTP Form Group */
  otpForm = this.fb.group({
    otp: ['', [Validators.required, Validators.pattern(regex.OTP)]]
  });

  resetForm = this.fb.group({
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(64),
      Validators.pattern(regex.PASSWORD_RULES.STRONG_PASSWORD)
    ]],
    confirmPassword: ['', [
      Validators.required,
      Validators.maxLength(64)
    ]]
  }, {
    validators: passwordMatchValidator('password', 'confirmPassword')
  });

  constructor(
    private commonService: CommonService,
    private authApi: AuthApi,
    private cd: ChangeDetectorRef,
    private otpFlow: OtpFlowService,
    private router: Router,
  ) {
    this.otpTimer$ = this.otpFlow.otpTimer$;
    this.canResend$ = this.otpFlow.canResend$;
    this.otpExpired$ = this.otpFlow.otpExpired$;
  }

  ngOnDestroy() {
    this.otpFlow.stop();
  }

  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  get passwordValue() {
    return this.resetForm.get('password')?.value || '';
  }

  checkRule(regex: RegExp): boolean {
    return regex.test(this.passwordValue);
  }

  // identify username is email or phone
  onIdentifierModeChange(mode: 'phone' | 'email') {
    this.isPhoneMode = mode === 'phone';
  }

  /** Handle login via OTP or Password */
  sendVerificationCode(): void {

    /* Validate login form */
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }
    this.sendOtp()
  }

  /** Login with OTP */
  private sendOtp(): void {
    const username = this.forgotPasswordForm.value.username!;

    this.otpFlow.sendOtp(username, () => {
      this.authStep = 'OTP';
      this.cd.detectChanges();
    });
  }

  resendOtp() {
    this.sendOtp()
  }

  // Step 2 – Verify OTP
  onVerifyOtp() {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }

    this.otpFlow.verifyResetPasswordOtp(
      this.otpForm.value.otp!,
      localStorage.getItem('currentSession')!,
      (res) => {
        localStorage.setItem('reset_token', res.data.resetToken);
        // LOGIN behavior
        this.authStep = 'RESET_PASSWORD';

        this.commonService.success(Messages.AUTH.OTP_SUCCESS);

      }
    );

  }

  submitNewPassword() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    const resetToken = localStorage.getItem('reset_token');

    this.authApi.resetPassword(resetToken!, this.resetForm.value.password!)
      .subscribe({
        next: (res: any) => {
          localStorage.removeItem('reset_token');

          this.commonService.success(res.message || Messages.AUTH.PASSWORD_RESET_SUCCESS);

           // ⏳ Redirect after 2.5 seconds
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2500);
        },
        error: (error) => {
          this.commonService.error(error.message);
        }
      });
  }

}

