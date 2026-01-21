import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Messages } from '../../utils/validation-messages';
import { AuthApi } from '../api-service/auth/auth.api';
import { CommonService } from '../helper/common.service';
import { AuthUser } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private userSubject = new BehaviorSubject<{
        id: string;
        role: string;
        //name: string;
    } | null>(null);

    user$ = this.userSubject.asObservable();

    constructor(
        private authApi: AuthApi,
        private commonService: CommonService,
        private zone: NgZone,
    ) { }

    /** Set user after login/OTP */
    setUser(user: AuthUser | null) {
        this.userSubject.next(user);
    }


    getUser() {
        return this.userSubject.value;
    }

    getRole() {
        return this.userSubject.value?.role.toUpperCase() ?? null;
    }

    clearUser() {
        this.userSubject.next(null);
    }

    login(data: any) {
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('role', data.user.role);
    }

    
    logout(onSuccess: () => void) {
        this.commonService.showLoader();

        this.authApi.logOut().subscribe({
            next: (res: any) => {
                localStorage.clear();
                this.clearUser();
                this.commonService.success(res.message || Messages.AUTH.LOGOUT_SUCCESS);
                onSuccess();
            },
            error: (err) => {
                this.commonService.error(err.message || Messages.AUTH.FETCH_USER_FAILED);
                this.commonService.hideLoader();
            },
            complete: () => this.commonService.hideLoader()
        });
    }

    saveToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    getToken() {
        return localStorage.getItem('accessToken');
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    /** Rehydrate user after page refresh */
    loadUserFromServer(
        onSuccess: (res: any) => void
    ) {

        this.authApi.userMe()
            .subscribe({
                next: (res) => onSuccess(res),
                error: (err) => {
                    localStorage.clear();
                    this.clearUser();
                    this.commonService.error(err.message || Messages.AUTH.FETCH_USER_FAILED);
                },
                complete: () => this.commonService.hideLoader()
            });

    }

}
