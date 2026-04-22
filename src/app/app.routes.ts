import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register/register-page.component';
import { MenuComponent } from './menu/menu.component';
import { NavComponent } from './components/nav/nav.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      { path: '', component: HomePageComponent, pathMatch: 'full' },
      { path: 'menu', component: MenuComponent },
    ],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
];
