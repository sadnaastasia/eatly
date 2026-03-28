import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, map, Observable, of, switchMap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  router = inject(Router);
  authService = inject(AuthService);
  errors: null | string[] = null;
  http: HttpClient = inject(HttpClient);

  form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
      asyncValidators: [userExistsValidator(this.authService)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
  });

  onSubmit() {
    this.form.markAllAsTouched();

    this.authService.signup(this.form.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
      error: (err) => {
        const errors = err.error?.errors;
        console.log(errors);
        errors.forEach((e: any) => {
          const control = this.form.get(e.path);

          if (control) {
            control.setErrors({
              server: e.msg,
            });
          }
        });
      },
    });
  }
}

export function userExistsValidator(
  authService: AuthService,
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return of(null);
    }

    return of(control.value).pipe(
      debounceTime(400),
      switchMap((username) => authService.checkUsername(username)),
      map((res) => (res.available ? null : { usernameTaken: true })),
      catchError(() => of(null)),
    );
  };
}
