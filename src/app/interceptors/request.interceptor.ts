import { HttpInterceptorFn } from '@angular/common/http'
import { environment } from '../../environments/environment'

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const headers = req.headers
    .set('Authorization', `Bearer ${environment.token}`)
    .set('Accept', 'application/json')

  return next(req.clone({ headers }))
}
