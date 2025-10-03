import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class httpErrorInterceptor implements HttpInterceptor{
     constructor(private router: Router, private toastr: ToastrService) {}
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        this.router.navigate(['/signin']);
      }
      const message = err.error?.message || err.statusText || 'Server error';
      this.toastr.error(message);
      return throwError(err);
    }));
  }
};
