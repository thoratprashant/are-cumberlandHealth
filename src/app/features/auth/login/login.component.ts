import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { AuthApi } from '../../../core/api-service/auth/auth.api';
import { CommonService } from '../../../core/helper/common.service';
import { RuntimeTranslatePlaceholderDirective } from '../../../core/i18n/runtime-translate-placeholder.directive';
import { RuntimeTranslateDirective } from '../../../core/i18n/runtime-translate.directive';
import { AuthService } from '../../../core/services/auth.service';
import { OtpFlowService } from '../../../core/services/otp-flow.service';
import { UserNameIdentifierDirective } from '../../../shared/directives/identifier.directive';
import { NumbersOnlyDirective } from '../../../shared/directives/numbers-only.directive';
import { UsPhoneOrEmailDirective } from '../../../shared/directives/us-phone-or-email.directive';
import { ShowErrorPipe } from '../../../shared/pipes/show-error.pipe';
import { emailOrMobileValidator } from '../../../shared/validators/email-or-mobile.validator';
import { regex } from '../../../utils/regex-patterns';
import { Messages, validationMessages } from '../../../utils/validation-messages';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ShowErrorPipe, MatButtonModule, MatIconModule, NumbersOnlyDirective, UserNameIdentifierDirective,RuntimeTranslateDirective, RuntimeTranslatePlaceholderDirective, UsPhoneOrEmailDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  validationMessages = validationMessages; // Expose validation messages to template
  message = Messages;
  regexPattern = regex;
  showNewPassword = false;
  isPhoneMode = false;
  otpTimer$!: Observable<number>;
  canResend$!: Observable<boolean>;
  otpExpired$!: Observable<boolean>;
  /** Controls which screen is visible */
  authStep: 'LOGIN' | 'OTP' | 'PASSWORD' = 'LOGIN';

  /* Form Builder Injection */
  private fb = inject(FormBuilder);

  /** Login form (email / mobile) */
  loginForm = this.fb.group({
    username: ['', emailOrMobileValidator()]
  });

  /* OTP Form Group */
  otpForm = this.fb.group({
    otp: ['', [Validators.required, Validators.pattern(regex.OTP)]]
  });

  /* Password Form Group */
  passwordForm = this.fb.group({
    password: ['', [
      Validators.required,
      Validators.minLength(regex.PASSWORD_RULES.MIN_LENGTH_PASSWORD),
      Validators.pattern(regex.PASSWORD_RULES.STRONG_PASSWORD)
    ]]
  });

  constructor(
    private commonService: CommonService,
    private router: Router,
    private authApi: AuthApi,
    private cd: ChangeDetectorRef,
    private otpFlow: OtpFlowService,
    private auth: AuthService
  ) {
    this.otpTimer$ = this.otpFlow.otpTimer$;
    this.canResend$ = this.otpFlow.canResend$;
    this.otpExpired$ = this.otpFlow.otpExpired$;
  }

  // identify username is email or phone
  onIdentifierModeChange(mode: 'phone' | 'email') {
    this.isPhoneMode = mode === 'phone';
  }

  /** Handle login via OTP or Password */
  onLoginVia(loginType: string): void {

    /* Validate login form */
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    /* Set auth step based on login type */
    if (loginType === 'otp') {

      /* Call API to send OTP */
      this.sendOtp();

    } else if (loginType === 'password') {

      /* check user exist or not */
      this.getUserProfile();
      //this.authStep = 'PASSWORD';
    }
  }

  /**
   * check wheather user exist or not 
   */
  private getUserProfile(): void {
    const username = this.loginForm.value.username!;
    this.commonService.showLoader();

    /* call api to get user detail */
    this.authApi.identify(username).pipe(
      finalize(() => this.commonService.hideLoader())
    ).subscribe({

      next: (res: any) => {


        if (res.data.exists) {
          /* Move to OTP step on success */
          this.authStep = 'PASSWORD';
          this.cd.detectChanges();
        } else {
          this.commonService.error(res.message || Messages.AUTH.USER_NOT_FOUND);
        }

      },
      error: (error) => {
        //this.commonService.hideLoader();
        this.commonService.error(error.message || Messages.AUTH.USER_NOT_FOUND);
      }
    });
  }

  /** Login with OTP */
  private sendOtp(): void {
    const username = this.loginForm.value.username!;

    this.otpFlow.sendOtp(username, () => {
      this.authStep = 'OTP';
      this.cd.detectChanges();
    });
  }

  // Step 2 – Verify OTP
  onVerifyOtp() {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }

    this.otpFlow.verifyOtp(
      this.otpForm.value.otp!,
      localStorage.getItem('currentSession')!,
      (res) => {
        this.cd.detectChanges();

        this.redirectToDashboard(res.data);
        
      }
    );

  }

  /* login successfull and redirect to dashboard */
  redirectToDashboard(data: any) {
    
    this.auth.saveToken(data.token.accessToken);

        // Set ONLY minimal UI context (memory preferred)
        this.auth.setUser(data.user);

        localStorage.removeItem('currentSession');

        this.commonService.success(Messages.AUTH.LOGIN_SUCCESS);

        this.auth.onLoginSuccess(); // 🔥 START IDLE TIMER

         // Delay redirect
        setTimeout(() => {
          switch (data.user.role) {
            case 'system_admin':
              
              this.router.navigate(['/system-admin/profile']);
              break;
            case 'admin':
              this.router.navigate(['/admin']);
              break;
            case 'front_desk':
              this.router.navigate(['/front-desk']);
              break;
            case 'provider':
              this.router.navigate(['/provider']);
              break;
          }
        }, 2000);
        

  }

  onLoginWithPassword() {

    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.commonService.showLoader();

    this.authApi.loginPassword(
      this.loginForm.value.username!,
      this.passwordForm.value.password!
    ).pipe(finalize(() => this.commonService.hideLoader()))
      .subscribe({
        next: (res: any) => {

          this.cd.detectChanges();

          this.redirectToDashboard(res.data);
        },
        error: (error) => {
          this.commonService.hideLoader();
          this.commonService.error(error.message || Messages.PASSWORD_RULES.PASSWORD_INVALID);
        }
      });
  }


  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  resendOtp() {
    this.sendOtp()
  }

  resetAuthFlow() {

    this.otpFlow.reset();

    // Reset forms
    //this.loginForm.reset();
    this.otpForm.reset();
    this.passwordForm.reset();

    // Clear auth step
    this.authStep = 'LOGIN';

    // Remove backend session
    localStorage.removeItem('currentSession');
  }

  get passwordValue() {
    return this.passwordForm.get('password')?.value || '';
  }

  checkRule(regex: RegExp): boolean {
    return regex.test(this.passwordValue);
  }


  ngOnDestroy() {
    this.otpFlow.stop();
  }
}
