import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  router = inject(Router);
  authService = inject(AuthService);
  error: null | string = null;

  form = new FormGroup({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSubmit(event: Event) {
    if (this.form.valid) {
      this.authService.login(this.form.getRawValue()).subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (err) => {
          this.error = err.error.message;
          console.log(this.error);
        },
      });
    }
  }
}
