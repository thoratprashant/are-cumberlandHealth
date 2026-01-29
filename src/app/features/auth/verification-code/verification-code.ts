import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verification-code',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './verification-code.html',
  styleUrls: ['./verification-code.scss'],
})
export class VerificationCode implements OnInit, OnDestroy {

  timeLeft = 120; // Timer in seconds
  private timerId!: number;

  otpForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    // Form initialized in constructor
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  ngOnInit(): void {
    // Start the timer as soon as component loads
    this.startTimer();
  }

  startTimer(): void {
    // Clear any existing interval to prevent duplicates
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    // Set initial time
    this.timeLeft = 120;

    // Start the interval
    this.timerId = window.setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timerId); // Stop when timer reaches 0
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    // Always clear timer when component is destroyed
    clearInterval(this.timerId);
  }

  get otpControl() {
    return this.otpForm.get('otp');
  }

  submitOtp(): void {
    if (this.otpForm.valid) {
      console.log('OTP submitted:', this.otpForm.value.otp);
      clearInterval(this.timerId); // Optional: stop timer on submit
    } else {
      console.log('OTP invalid');
    }
  }

  resendOtp(): void {
    this.otpForm.reset();
    this.startTimer(); // restart timer if OTP resent
  }
}
