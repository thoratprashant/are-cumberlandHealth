import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = () => {
  
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.isLoggedIn?.();

  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
