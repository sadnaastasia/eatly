import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {
  tap,
  catchError,
  throwError,
  of,
  debounceTime,
  switchMap,
  map,
} from 'rxjs';
import { TokenResponse } from './authorization.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  cookieService = inject(CookieService);
  baseApiUrl: string = import.meta.env.NG_APP_URL;

  token: string | null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
    }
    return !!this.token;
  }

  signup(payload: { username: string; email: string; password: string }) {
    return this.http.post(`${this.baseApiUrl}auth/signup`, payload);
  }

  checkUsername(username: string) {
    return this.http.post<{ available: boolean }>(
      `${this.baseApiUrl}auth/check-username`,
      { username },
    );
  }

  login(payload: { username: string; password: string }) {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}auth/signin`, payload)
      .pipe(tap((res) => this.saveToken(res)));
  }

  refreshAuthToken() {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}auth/refresh`, null)
      .pipe(
        catchError((error) => {
          this.logout();
          return throwError(error);
        }),
      );
  }

  logout() {
    this.http
      .post(`${this.baseApiUrl}auth/logout`, null, {
        withCredentials: true,
      })
      .subscribe();
    this.cookieService.deleteAll();
    this.token = null;
  }

  saveToken(res: TokenResponse) {
    this.token = res.accessToken;
    this.cookieService.set('token', this.token);
  }
}
