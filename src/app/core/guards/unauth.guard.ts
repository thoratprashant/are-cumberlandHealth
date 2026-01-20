import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const unauthGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.isLoggedIn?.();
  const role = auth.getRole?.();

  // ✅ If already logged in → redirect away from login
  if (token && role) {
    // role-based redirect
    switch (role) {
      case 'SYSTEM_ADMIN':
        router.navigate(['/system-admin/profile']);
        break;
      case 'ADMIN':
        router.navigate(['/admin']);
        break;
      case 'FRONT_DESK':
        router.navigate(['/frontdesk']);
        break;
      case 'PROVIDER':
        router.navigate(['/provider']);
        break;
      default:
        router.navigate(['/']);
    }
    return false;
  }

  // ✅ Not logged in → allow access to login
  return true;
};
