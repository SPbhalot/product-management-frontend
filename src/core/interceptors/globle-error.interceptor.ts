import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class globleErrorInterceptor implements ErrorHandler{
    constructor(private injector: Injector) {}
  handleError(error: any): void {
    const toastr = this.injector.get(ToastrService);
    console.error(error);
    toastr.error('An unexpected error occurred.');
  }
}



