import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {

  const toastr = inject(MessageService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error instanceof HttpErrorResponse) {
        const errorMessage =
          typeof error.error === 'string'
            ? error.error
            : error.error?.errorMessage || error.error?.message || error.statusText || 'An error occurred';

        toastr.add({ severity: 'Error', summary: 'Error', detail: errorMessage });
      }
      return throwError(() => error);
    })
  );
};
