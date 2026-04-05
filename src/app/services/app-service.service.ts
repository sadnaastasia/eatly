import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Dish } from './app.interface';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  http: HttpClient = inject(HttpClient);
  baseApiUrl: string = import.meta.env.NG_APP_URL;

  getAllDishes() {
    return this.http.get<Dish[]>(`${this.baseApiUrl}menu/all`);
  }

  searchDish(formValue: string) {
    return this.http.get<Dish[]>(
      `${this.baseApiUrl}menu/search?query=${formValue}`,
    );
  }
}
