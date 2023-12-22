import { ApplicationConfig, LOCALE_ID } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { requestInterceptor } from './interceptors/request.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([requestInterceptor])
    ),
    {
      provide: LOCALE_ID,
      useValue: 'es-MX'
    }
  ],
}
