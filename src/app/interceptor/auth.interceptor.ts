import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const dialog = inject(MatDialog);
  const token = localStorage.getItem('token');

  const protectedRoutes = ['/user/', '/admin/', '/video/'];
  const isProtected = protectedRoutes.some(path => req.url.includes(path));

  if (token && isProtected) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 403 || error.status === 401) {
        localStorage.removeItem('token');
        dialog.closeAll();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
