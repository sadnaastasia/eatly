import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register/register-page.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NavComponent } from './components/nav/nav.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      { path: '', component: HomePageComponent, pathMatch: 'full' },
      { path: 'menu', component: MenuComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'cart', component: CartComponent },
    ],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
];
