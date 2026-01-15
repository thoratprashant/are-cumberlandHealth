import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, finalize, Subscription, timer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthApi } from '../../core/api-service/auth/auth.api';
import { CommonService } from '../../core/helper/common.service';
import { Messages } from '../../utils/validation-messages';

@Injectable({ providedIn: 'root' })
export class OtpFlowService {

    otpTimer$ = new BehaviorSubject<number>(environment.otpExpirySeconds);
    canResend$ = new BehaviorSubject<boolean>(false);
    otpExpired$ = new BehaviorSubject<boolean>(false);

    private timerSub?: Subscription;

    constructor(
        private authApi: AuthApi,
        private commonService: CommonService,
        private zone: NgZone
    ) { }

    sendOtp(username: string, onSuccess: () => void) {
        this.commonService.showLoader();

        this.authApi.sendOtp(username).subscribe({
            next: (res: any) => {
                localStorage.setItem('currentSession', res.data.sessionId);
                this.startTimer();
                this.commonService.success(res.message || Messages.AUTH.OTP_SENT);
                onSuccess();
            },
            error: (err) => {
                this.commonService.error(err.message || Messages.AUTH.OTP_FAILED);
                this.commonService.hideLoader();
            },
            complete: () => this.commonService.hideLoader()
        });
    }

    verifyOtp(
        otp: string,
        sessionId: string,
        onSuccess: (res: any) => void
    ) {
        this.commonService.showLoader();

        this.authApi.verifyOtp(otp, sessionId)
            .pipe(finalize(() => this.commonService.hideLoader()))
            .subscribe({
                next: (res) => onSuccess(res),
                error: (err) => {
                    this.commonService.error(err.message || Messages.AUTH.OTP_INVALID);
                },
                complete: () => this.commonService.hideLoader()
            });
    }

    verifyResetPasswordOtp(
        otp: string,
        sessionId: string,
        onSuccess: (res: any) => void
    ) {
        this.commonService.showLoader();

        this.authApi.verifyResetPasswordOtp(otp, sessionId)
            .pipe(finalize(() => this.commonService.hideLoader()))
            .subscribe({
                next: (res) => onSuccess(res),
                error: (err) => {
                    this.commonService.error(err.message || Messages.AUTH.OTP_INVALID);
                },
                complete: () => this.commonService.hideLoader()
            });
    }

    private startTimer() {
        this.timerSub?.unsubscribe();

        this.otpTimer$.next(environment.otpExpirySeconds);
        this.canResend$.next(false);
        this.otpExpired$.next(false);

        this.timerSub = timer(0, 1000).subscribe(t => {
            this.zone.run(() => {
                const v = environment.otpExpirySeconds - t;
                this.otpTimer$.next(v);

                if (v <= 0) {
                    this.otpExpired$.next(true);
                    this.canResend$.next(true);
                    this.timerSub?.unsubscribe();
                    this.timerSub?.unsubscribe();
                }
            });
        });
    }

    stop() {
        this.timerSub?.unsubscribe();
    }

    reset() {
        this.timerSub?.unsubscribe();
        this.otpTimer$.next(0);
        this.canResend$.next(false);
        this.otpExpired$.next(false);
    }
}
