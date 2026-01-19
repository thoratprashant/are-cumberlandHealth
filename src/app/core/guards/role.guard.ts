import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles = route.data['roles'];
    const userRole = this.auth.getRole();

    if (!roles.includes(userRole)) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;

  }
}
