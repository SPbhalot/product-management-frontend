

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { globleErrorInterceptor } from '../core/interceptors/globle-error.interceptor';
import { httpErrorInterceptor } from '../core/interceptors/http-error.interceptor';
import { httpInterceptor } from '../core/interceptors/http.interceptor';
import { SigninComponent } from '../pages/authPages/signin/signin.component';
import { SignupComponent } from '../pages/authPages/signup/signup.component';
import { ProductListComponent } from '../pages/product-list/product-list.component';
import { ProductComponent } from '../pages/product/product.component';

// import { ProductCreateComponent } from './products/product-create.component';
import { authGuard } from '../core/guards/auth.guard';
// import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ProductComponent, canActivate: [authGuard] },
  { path: 'products/create', component: ProductComponent, canActivate:  [authGuard] },
  // lazy load categories / more...
  { path: '**', redirectTo: 'products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking' // SSR friendly
  })],
  exports: [RouterModule],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: httpErrorInterceptor, multi: true },
  { provide: ErrorHandler, useClass: globleErrorInterceptor }
]
})
export class AppRoutingModule {}
