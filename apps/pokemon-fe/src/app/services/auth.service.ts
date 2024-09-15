import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, distinctUntilChanged, Observable, tap } from 'rxjs';
import { LoginResponse } from '../dtos/login.dto';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private readonly baseUrl = environment.BASE_URL;
  constructor(private readonly http: HttpClient) {}

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.setAuth(null);
  }

  getStatus(): Observable<User> {
    const accessToken = localStorage.getItem('access_token');

    return this.http
      .get<User>(`${this.baseUrl}/auth/status`, {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      })
      .pipe(
        tap((user) => {
          if (user && user.id) {
            this.setAuth(user);
          }
        }),
      );
  }

  signUp(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/sign-up`, {
        userName: username,
        password,
      })
      .pipe(
        tap((response) => {
          if (response) {
            if (response.access_token) {
              localStorage.setItem('access_token', response.access_token);
            }
            if (response.refresh_token) {
              localStorage.setItem('refresh_token', response.refresh_token);
            }
            if (response.user) {
              this.setAuth(response.user);
            }
          }
        }),
      );
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/sign-in`, {
        userName: username,
        password,
      })
      .pipe(
        tap((response) => {
          if (response) {
            if (response.access_token) {
              localStorage.setItem('access_token', response.access_token);
            }
            if (response.refresh_token) {
              localStorage.setItem('refresh_token', response.refresh_token);
            }
            if (response.user) {
              this.setAuth(response.user);
            }
          }
        }),
      );
  }

  setAuth(user: User | null): void {
    this.currentUserSubject.next(user);
  }
}
