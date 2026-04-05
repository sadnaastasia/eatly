import { Component, inject, OnInit, signal } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';
import { Dish } from '../services/app.interface';
import { NgClass } from '@angular/common';
import { MathTruncPipe } from '../pipes/math-trunc.pipe';
import { MatIconModule } from '@angular/material/icon';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [
    NgClass,
    MathTruncPipe,
    MatIconModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  private appService = inject(AppServiceService);
  allDishes: Dish[] = [];
  filteredDishes$!: Observable<Dish[]>;
  mainDish: Dish | null = null;

  search = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.appService.getAllDishes().subscribe((data) => {
      this.allDishes = data.filter((dish) => dish.id !== 4);
      this.mainDish = data[3];
      console.log(this.allDishes);
    });

    this.filteredDishes$ = this.search.valueChanges.pipe(
      tap((v) => console.log('VALUE:', v)),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((formValue) => this.appService.searchDish(formValue)),
    );
  }
}
