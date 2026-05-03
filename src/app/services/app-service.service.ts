import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { CartItem, Dish } from './app.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  http: HttpClient = inject(HttpClient);
  baseApiUrl: string = import.meta.env.NG_APP_URL + 'api/';

  cart = signal<CartItem[]>([]);

  getDishById(id: number) {
    return this.http.get<Dish>(`${this.baseApiUrl}menu/dishById/${id}`);
  }

  getAllDishes() {
    return this.http.get<Dish[]>(`${this.baseApiUrl}menu/all`);
  }

  getCartPrice(cart: CartItem[]) {
    return this.http.post<{ total: number }>(
      `${this.baseApiUrl}cart/getCartPrice`,
      cart,
    );
  }

  searchDish(formValue: string) {
    return this.http.get<Dish[]>(
      `${this.baseApiUrl}menu/search?query=${formValue}`,
    );
  }

  mergeCarts() {
    return this.http.post(`${this.baseApiUrl}cart/mergeCarts`, null, {
      withCredentials: true,
    });
  }

  getAllCart() {
    return this.http
      .get<CartItem[]>(`${this.baseApiUrl}cart/getCart`, {
        withCredentials: true,
      })
      .subscribe({
        next: (data) => this.cart.set(data),
        error: (err) => console.error(err),
      });
  }

  addToCart(dishId: number) {
    const cart = [...this.cart()];
    const item = cart.find((i) => i.dishId === dishId);

    if (item) {
      item.quantity += 1;
    } else {
      cart.push({ dishId: dishId, quantity: 1 });
    }

    this.cart.set(cart);
    this.http
      .post(
        `${this.baseApiUrl}cart/add`,
        { dishId: dishId },
        {
          withCredentials: true,
        },
      )
      .subscribe();
  }

  deleteFromCart(dishId: number) {
    const cart = [...this.cart()];
    const item = cart.find((i) => i.dishId === dishId);

    if (!item) return;

    if (item.quantity === 1) {
      this.cart.set(cart.filter((i) => i.dishId !== dishId));
    } else {
      item.quantity -= 1;
      this.cart.set(cart);
    }
    this.http
      .post(
        `${this.baseApiUrl}cart/delete`,
        { dishId: dishId },
        {
          withCredentials: true,
        },
      )
      .subscribe();
  }

  getQuantity(dishId: number): number {
    return this.cart().find((i) => i.dishId === dishId)?.quantity || 0;
  }

  getQuantityAll(cartDishes: CartItem[]) {
    return cartDishes.reduce((sum, cartDish) => sum + cartDish.quantity, 0);
  }
}
