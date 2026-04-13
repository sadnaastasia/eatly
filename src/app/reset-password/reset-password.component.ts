import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  authService = inject(AuthService);
  route = inject(ActivatedRoute);

  password = new FormControl<string>('', {
    nonNullable: true,
  });
  token = new FormControl<string>('', {
    nonNullable: true,
  });
  message = new FormControl<string>('', {
    nonNullable: true,
  });

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'];
  }

  submit() {
    this.authService
      .resetPassword(this.token.value, this.password.value)
      .subscribe({
        next: () => this.message.setValue('Пароль изменён'),
        error: () => this.message.setValue('Ошибка'),
      });
  }
}
