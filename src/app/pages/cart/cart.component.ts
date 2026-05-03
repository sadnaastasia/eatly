import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AppServiceService } from '../../services/app-service.service';
import { NgClass } from '@angular/common';
import { MathTruncPipe } from '../../pipes/math-trunc.pipe';
import { CartItem, Dish } from '../../services/app.interface';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [NgClass, MathTruncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private appService = inject(AppServiceService);
  cart = this.appService.cart;

  sum = signal<number>(0);

  computedSum = computed(() => {
    this.appService.getCartPrice(this.cart()).subscribe({
      next: (data) => {
        console.log(data.total);
        this.sum.set(data.total);
      },
    });
    return this.sum();
  });

  dishes = signal<Dish[]>([]);

  filteredDishes = computed(() => {
    return this.dishes().filter((dish) =>
      this.cart().some((item) => item.dishId === dish.id),
    );
  });

  ngOnInit(): void {
    this.appService.getAllCart();

    this.appService.getAllDishes().subscribe((data) => {
      this.dishes.set(data);
    });
  }

  addToCart(dishId: number) {
    this.appService.addToCart(dishId);
  }

  deleteFromCart(dishId: number) {
    this.appService.deleteFromCart(dishId);
  }

  getQuantity(dishId: number) {
    return this.appService.getQuantity(dishId);
  }
}
