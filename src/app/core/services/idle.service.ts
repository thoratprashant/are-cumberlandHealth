import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { CommonService } from "../helper/common.service";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class IdleService {
  private timeout: any;
  private readonly IDLE_TIME = environment.screenIdleTimeoutMinutes * 60 * 1000; // 10 min

  constructor(private auth: AuthService, private router: Router,private commonService: CommonService,
      ) {
    ['mousemove', 'keydown', 'click'].forEach(event =>
      window.addEventListener(event, () => this.resetTimer())
    );
    this.resetTimer();
  }

  resetTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.logout(), this.IDLE_TIME);
  }

  logout() {

     this.commonService.showLoader();
    this.auth.logout(() => {
      this.commonService.hideLoader();

      setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      
    });
  }
}
