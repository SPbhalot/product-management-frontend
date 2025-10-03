import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
    if (!authService.isLoggedIn()) {
      router.navigate(['/signin']);
      return false;
    }
    return true;

    //  if (!this.auth.hasRole('admin')) {
    //   this.router.navigate(['/products']);
    //   return false;
    // }
};
