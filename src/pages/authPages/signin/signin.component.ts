import { animate, style, transition, trigger } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  animations: [
    trigger('cardAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(12px)' }),
        animate('350ms cubic-bezier(.2,.8,.2,1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
]
})
export class SigninComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  loading = false;
  error = '';
  //  auth = inject(AuthService);
  //  router = inject(Router);
  constructor() { }
  submit() {
    this.error = '';
    if (this.form.invalid) return;
    this.loading = true;
    setTimeout(() => {
      // const u = this.auth.login(this.form.value as any);
      this.loading = false;
      // if (u) {
      //   this.router.navigate(['/dashboard']);
      // } else {
      //   this.error = 'Invalid credentials';
      // }
    }, 700);
  }
}
