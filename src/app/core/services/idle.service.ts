import { Injectable, NgZone } from '@angular/core';
import { fromEvent, merge, Subscription, timer } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IdleService {

  private activitySub?: Subscription;
  private timeoutSub?: Subscription;

  // Example: 10 or 15 minutes from environment
  private readonly IDLE_TIME =
    environment.screenIdleTimeoutMinutes * 60 * 1000;

  constructor(private zone: NgZone) {}

  /**
   * Start idle tracking
   * Called ONLY after login
   */
  start(onTimeout: () => void): void {
    this.stop(); // prevent duplicate timers

    this.zone.runOutsideAngular(() => {
      const activity$ = merge(
        fromEvent(document, 'mousemove'),
        fromEvent(document, 'keydown'),
        fromEvent(document, 'click'),
        fromEvent(document, 'scroll'),
        fromEvent(document, 'touchstart')
      );

      this.activitySub = activity$.subscribe(() => {
        this.resetTimer(onTimeout);
      });

      this.resetTimer(onTimeout);
    });
  }

  /**
   * Reset idle timer
   */
  private resetTimer(onTimeout: () => void): void {
    this.timeoutSub?.unsubscribe();

    this.timeoutSub = timer(this.IDLE_TIME).subscribe(() => {
      onTimeout(); // 🔥 IDLE LOGOUT TRIGGER
    });
  }

  /**
   * Stop idle tracking (on logout)
   */
  stop(): void {
    this.activitySub?.unsubscribe();
    this.timeoutSub?.unsubscribe();
    this.activitySub = undefined;
    this.timeoutSub = undefined;
  }
}
