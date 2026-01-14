import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { finalize, map, Subscription, takeWhile, timer } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthApi } from '../../../core/api-service/auth/auth.api';
import { CommonService } from '../../../core/helper/common.service';
import { UserNameIdentifierDirective } from '../../../shared/directives/identifier.directive';
import { NumbersOnlyDirective } from '../../../shared/directives/numbers-only.directive';
import { ShowErrorPipe } from '../../../shared/pipes/show-error.pipe';
import { emailOrMobileValidator } from '../../../shared/validators/email-or-mobile.validator';
import { regex } from '../../../utils/regex-patterns';
import { Messages, validationMessages } from '../../../utils/validation-messages';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ShowErrorPipe, MatButtonModule, MatIconModule, NumbersOnlyDirective, UserNameIdentifierDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  validationMessages = validationMessages; // Expose validation messages to template
  message = Messages;
  regexPattern = regex;
  showNewPassword = false;
  otpTimer = environment.otpExpirySeconds;
  canResend = false;
  otpExpired = false;
  timerSub!: Subscription;
  isPhoneMode = false;

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
    private zone: NgZone,
    private cd: ChangeDetectorRef
  ) { }

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
      this.loginWithOtp();

    } else if (loginType === 'password') {

      /* check user exist or not */
      this.getUserProfile();
      //this.authStep = 'PASSWORD';
    }
  }

  /**
   * check wheather user exist or not 
   */
  private getUserProfile(): void{
      const username = this.loginForm.value.username!;
      this.commonService.showLoader();

      /* call api to get user detail */
      this.authApi.identify(username).pipe(
        finalize(() => this.commonService.hideLoader())
      ).subscribe({

        next: (res: any) => {
          

          if(res.data.exists){
            /* Move to OTP step on success */
            this.authStep = 'PASSWORD';
            this.cd.detectChanges();
          }else{
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
  private loginWithOtp(): void {
    const username = this.loginForm.value.username!;
    this.commonService.showLoader();
    /* Call API to send OTP */
    this.authApi.loginOtp(username).pipe(
      finalize(() => this.commonService.hideLoader())
    ).subscribe({

      next: (res: any) => {
        /* Move to OTP step on success */
        this.authStep = 'OTP';

        localStorage.setItem('loginSession', res.data.sessionId);

        /* Start OTP expiry timer */
        this.startOtpTimer();
        this.cd.detectChanges();
        this.commonService.success(res.message || Messages.AUTH.OTP_SENT);
      },
      error: (error) => {
        //this.commonService.hideLoader();
        this.commonService.error(error.message || Messages.AUTH.OTP_FAILED);
      }

    });
  }

  // Step 2 – Verify OTP
  onVerifyOtp() {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }
    this.commonService.showLoader();
    this.authApi.verifyOtp(
      this.otpForm.value.otp!,
      localStorage.getItem('loginSession')!
    ).pipe(
      finalize(() => this.commonService.hideLoader())
    ).subscribe({
      next: (res: any) => {

        this.cd.detectChanges();

        // Store JWT
        localStorage.setItem('auth_token', res.data.accessToken);

       localStorage.setItem('refresh_token', res.data.refreshToken);

        // Remove temp session
        localStorage.removeItem('loginSession');

        this.commonService.success(Messages.AUTH.LOGIN_SUCCESS);
        // Navigate to dashboard
        this.router.navigate(['/dashboard']);

        
      },
      error: (error) => {
        this.commonService.hideLoader();
        this.commonService.error(error.message || Messages.AUTH.OTP_INVALID);
      }
    });
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

       localStorage.setItem('auth_token', res.data.accessToken);

       localStorage.setItem('refresh_token', res.data.refreshToken);
       
       this.commonService.success(res.message || Messages.AUTH.LOGIN_SUCCESS);
       //this.router.navigate(['/dashboard']);
     },
     error: (error) => {
        this.commonService.hideLoader();
        this.commonService.error(error.message || Messages.PASSWORD_RULES.PASSWORD_INVALID);
     }
   });
}

  // OTP expiry countdown
  startOtpTimer() {
    // Stop old timer
    this.timerSub?.unsubscribe();

    this.canResend = false;
    this.otpExpired = false;

    const total = environment.otpExpirySeconds;

    this.timerSub = timer(0, 1000)
      .pipe(
        map(t => total - t),
        takeWhile(v => v >= 0)
      )
      .subscribe(v => {
        this.otpTimer = v;
        if (v === 0) {
          this.otpExpired = true;
          this.canResend = true;
        }
        this.cd.detectChanges();
      });
  }

  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  resendOtp() {
    this.loginWithOtp()
  }

  resetAuthFlow() {

    // Stop OTP timer
    this.timerSub?.unsubscribe();

    // Clear OTP state
    this.otpTimer = 0;
    this.canResend = false;
    this.otpExpired = false;

    // Reset forms
    //this.loginForm.reset();
    this.otpForm.reset();
    this.passwordForm.reset();

    // Clear auth step
    this.authStep = 'LOGIN';

    // Remove backend session
    localStorage.removeItem('loginSession');
  }

  get passwordValue() {
    return this.passwordForm.get('password')?.value || '';
  }

  checkRule(regex: RegExp): boolean {
    return regex.test(this.passwordValue);
  }
  

  ngOnDestroy() {
    this.timerSub?.unsubscribe();
  }
}
