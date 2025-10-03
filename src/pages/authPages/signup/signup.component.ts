import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
 signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  fields = [
    { label: 'Name', formControlName: 'name', type: 'text' },
    { label: 'Email', formControlName: 'email', type: 'email' },
    { label: 'Password', formControlName: 'password', type: 'password' }
  ];

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.signupForm.valid) {
      alert('Form Submitted!');
    }
  }
}
