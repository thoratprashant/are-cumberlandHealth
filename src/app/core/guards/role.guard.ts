import { inject } from '@angular/core';
import { CanMatchFn, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanMatchFn = (route: Route) => {
  
  const auth = inject(AuthService);
  const router = inject(Router);

  const allowedRoles = route.data?.['roles'] as string[] | undefined;
  const userRole = auth.getRole();

  if (!allowedRoles || !userRole || !allowedRoles.includes(userRole)) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
