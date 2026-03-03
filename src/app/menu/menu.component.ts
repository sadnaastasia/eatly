import { Component, inject, OnInit, signal } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';
import { Dish } from '../services/app.interface';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  private appService = inject(AppServiceService);
  allDishes: Dish[] = [];
  ngOnInit(): void {
    this.appService.getAllDishes().subscribe((data) => {
      this.allDishes = data;
      console.log(this.allDishes);
    });
  }
}
