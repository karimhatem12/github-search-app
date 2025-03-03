import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';

import Aura from '@primeng/themes/aura';
import { provideStore } from '@ngrx/store';
import { userReducer } from './store/github/user.reducer';
import { UserEffects } from './store/github/user.effects';
import { provideEffects } from '@ngrx/effects';
import { responseInterceptor } from './core/interceptors/response/response.interceptor';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideHttpClient(withInterceptors([responseInterceptor])),
    provideStore({ users: userReducer }),
    provideEffects(UserEffects),
    MessageService
  ],
};
