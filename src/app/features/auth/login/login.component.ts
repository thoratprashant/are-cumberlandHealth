import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../core/helper/common.service';
import { RouterLink, Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(\d{10}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
        )
      ]
    ]
  });

  constructor(private commonService: CommonService,  private router: Router) {}

  onLoginViaOtp(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.commonService.showLoader();

    setTimeout(() => {
      this.commonService.hideLoader();
      this.router.navigate(['/auth/verification-code']);
    }, 2000);
  }
}
