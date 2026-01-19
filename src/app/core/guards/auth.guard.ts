import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(): boolean {
    return this.auth.isLoggedIn();
  }
}
