import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { HttpEvent, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { routes } from './app.routes';
import { RuntimeTranslateManager } from './core/i18n/runtime-translate.manager';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { AuthService } from './core/services/auth.service';


/**
 * APP_INITIALIZER
 * Rehydrates logged-in user before app bootstrap
 */
export function authInitializerFactory(auth: AuthService) {
  return () =>
    new Promise<void>((resolve) => {
      const token = localStorage.getItem('accessToken');

      // No token → skip rehydration
      if (!token) {
        resolve();
        return;
      }

      // Defensive timeout (never block bootstrap)
      const fallback = setTimeout(() => resolve(), 3000);

      auth.loadUserFromServer((res: any) => {
        clearTimeout(fallback);

        if (res?.success && res.data) {
          auth.setUser(res.data);
          auth.onLoginSuccess(); // 🔥 restart idle after refresh
        } else {
          localStorage.clear();
          auth.clearUser();
        }

        resolve();
      });
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    RuntimeTranslateManager,
    provideHttpClient(
      withInterceptors([
        (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
          const interceptor = new TokenInterceptor();
          // Wrap HttpHandlerFn in an object implementing HttpHandler
          const handler = { handle: next };
          return interceptor.intercept(req, handler);
        }
      ])
    ),

    {
      provide: APP_INITIALIZER,
      useFactory: authInitializerFactory,
      deps: [AuthService],
      multi: true
    }
  ]
};
