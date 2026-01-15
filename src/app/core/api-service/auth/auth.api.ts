import { Injectable } from "@angular/core";
import { ApiService } from "../api.service";

@Injectable({ providedIn: 'root' })
export class AuthApi {

  constructor(private api: ApiService) {}

  // send otp
  sendOtp(username: string) {
    return this.api.post<{ success: boolean; message: string; data: any }>('/auth/send-otp', { username });
  }

  // verify otp
  verifyOtp(otp: string, sessionId: string) {
    return this.api.post<{ success: boolean; message: string; data: any }>('/auth/verify-otp', { otp, sessionId });
  }

  //verify otp for reset password
  verifyResetPasswordOtp(otp: string, sessionId: string) {
    return this.api.post<{ success: boolean; message: string; data: any }>('/auth/verify-reset-otp', { otp, sessionId });
  }

  resetPassword(resetToken: string, password: string) {
    return this.api.post<{ success: boolean; message: string; data: any }>('/auth/reset-password', { resetToken, password });
  }

  // login via password
  loginPassword(username: string, password: string) {
    return this.api.post<{ success: boolean; message: string; data: any }>('/auth/login-password', { username, password });
  }

  // check identity or user
  identify(username: string) {
    return this.api.post<{ success: boolean; message: string; data: any }>('/auth/identify', { username });
  }
  
}
