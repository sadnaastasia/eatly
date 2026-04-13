import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  authService = inject(AuthService);

  email = new FormControl<string>('', {
    nonNullable: true,
  });
  message = new FormControl<string>('', {
    nonNullable: true,
  });

  submit() {
    this.authService.forgotPassword(this.email.value).subscribe({
      next: () => this.message.setValue('Письмо отправлено'),
      error: () => this.message.setValue('Ошибка'),
    });
  }
}
