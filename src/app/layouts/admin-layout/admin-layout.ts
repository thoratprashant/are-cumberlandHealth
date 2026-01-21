import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonService } from '../../core/helper/common.service';
import { AuthService } from '../../core/services/auth.service';
import { Messages } from '../../utils/validation-messages';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,MatIconModule, MatButtonModule, MatBadgeModule,RouterModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {
  mobileMenuOpen = signal(false);

  constructor(
    private commonService: CommonService,
    private router: Router,
    private auth: AuthService
  ) {
   
  }

  toggleMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.mobileMenuOpen.set(false);
  }

  // logout from device
  logOut() {
    this.commonService.showLoader();
    this.auth.logout(() => {
      this.commonService.hideLoader();
      this.commonService.success(Messages.AUTH.LOGOUT_SUCCESS);
      setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      
    });
    
    
  }
  
}
