import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { RouterOutlet } from '@angular/router';
import { CartItem } from '../../services/app.interface';
import { AppServiceService } from '../../services/app-service.service';

@Component({
  selector: 'app-nav',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  private appService = inject(AppServiceService);

  authService = inject(AuthService);
  isMenuOpen = false;

  cart = this.appService.cart;

  quantity = computed(() => this.getQuantityAll(this.cart()));

  logout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getQuantityAll(cartDishes: CartItem[]) {
    return this.appService.getQuantityAll(cartDishes);
  }
}
