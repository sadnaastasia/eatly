import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  router = inject(Router);
  authService = inject(AuthService);

  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  onSubmit(event: Event) {
    if (this.form.valid) {
      //@ts-ignore
      this.authService.signup(this.form.value).subscribe((res) => {
        this.router.navigate(['login']);
        console.log(res);
      });
    }
  }
}
