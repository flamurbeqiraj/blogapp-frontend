import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const accountService = inject(AccountService);
  const router = inject(Router);

  const handle400Error = (error: any) => {
    if (!!error.error && Array.isArray(error.error)) {
      let errorMessage = '';
      for (const key in error.error) {
        if (!!error.error[key]) {
          const errorElement = error.error[key];
          errorMessage = (`${errorMessage}${errorElement.code} - ${errorElement.description}\n`);
        }
      }
      toastr.error(errorMessage, error.statusText);
      console.log(error.error);
    } else if (!!error?.error?.errors?.Content && (typeof error.error.errors.Content) === 'object') {
      let errorObject = error.error.errors.Content;
      let errorMessage = '';
      for (const key in errorObject) {
        const errorElement = errorObject[key];
        errorMessage = (`${errorMessage}${errorElement}\n`);
      }
      toastr.error(errorMessage, error.statusCode);
      console.log(error.error);
    } else if (!!error.error) {
      let errorMessage = ((typeof error.error) === 'string')
        ? error.error
        : 'There was a validation error.';
      toastr.error(errorMessage, error.statusCode);
      console.log(error.error);
    } else {
      toastr.error(error.statusText, error.status);
      console.log(error);
    }
  }

  const handle401Error = (error: any) => {
    let errorMessage = 'Please login to your account.';
    accountService.logout();
    toastr.error(errorMessage, error.statusText);
    router.navigate(['/login']);
  }

  const handle500Error = (error: any) => {
    toastr.error('Please contact the administrator. An error happened in the server.');
    console.log(error);
  }

  const handleUnexpectedError = (error: any) => {
    toastr.error('Something unexpected happened.');
    console.log(error);
  }

  return next(req).pipe(
    catchError((error) => {
      if (error) {
        switch(error.status) {
          case 400:
            handle400Error(error);
          break;
          case 401:
            handle401Error(error);
          break;
          case 500:
            handle500Error(error);
          break;
          default:
            handleUnexpectedError(error);
            break; 
        }
      }
      return throwError(error);
    })
  ); 
};