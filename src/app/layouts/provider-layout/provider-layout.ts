import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonService } from '../../core/helper/common.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-provider-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,MatIconModule, MatButtonModule, MatBadgeModule,RouterModule],
  templateUrl: './provider-layout.html',
  styleUrl: './provider-layout.scss',
})
export class ProviderLayout {
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

      setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      
    });
    
    
  }
  
}
