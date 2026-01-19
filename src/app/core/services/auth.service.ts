import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthUser } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private userSubject = new BehaviorSubject<{
        id: string;
        role: string;
        name: string;
    } | null>(null);

    user$ = this.userSubject.asObservable();

    /** Set user after login/OTP */
    setUser(user: AuthUser | null) {
        this.userSubject.next(user);
    }


    getUser() {
        return this.userSubject.value;
    }

    getRole() {
        return this.userSubject.value?.role ?? null;
    }

    clearUser() {
        this.userSubject.next(null);
    }

    login(data: any) {
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('role', data.user.role);
    }

    logout() {
        localStorage.clear();
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

}
