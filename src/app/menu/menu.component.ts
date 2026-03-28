import { Component, inject, OnInit, signal } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';
import { Dish } from '../services/app.interface';
import { NgClass } from '@angular/common';
import { MathTruncPipe } from '../pipes/math-trunc.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  imports: [NgClass, MathTruncPipe, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  private appService = inject(AppServiceService);
  allDishes: Dish[] = [];
  mainDish: Dish | null = null;
  ngOnInit(): void {
    this.appService.getAllDishes().subscribe((data) => {
      this.allDishes = data.filter((dish) => dish.id !== 4);
      this.mainDish = data[3];
      console.log(this.allDishes);
    });
  }
}
