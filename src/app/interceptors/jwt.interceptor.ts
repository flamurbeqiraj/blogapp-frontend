import { HttpInterceptorFn } from '@angular/common/http';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  const currentUser = accountService.currentUserValue;
  const isApiUrl = req.url.startsWith(environment.webApi);
  if (accountService.isLoggedIn() && isApiUrl) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser?.token}`
      }
    })
  }
  return next(req); 
};