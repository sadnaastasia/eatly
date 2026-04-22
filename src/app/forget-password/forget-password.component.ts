import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  authService = inject(AuthService);

  email = new FormControl<string>('', {
    nonNullable: true,
  });
  message = '';

  submit() {
    this.authService.forgetPassword(this.email.value).subscribe({
      next: () => (this.message = 'Email sent'),
      error: () => (this.message = 'Error'),
    });
  }
}
