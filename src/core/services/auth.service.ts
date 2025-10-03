import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  user$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    // const token = localStorage.getItem(this.tokenKey);
    // if (token) this.setToken(token);
  }

  login(email: string, password: string) {
    return this.http.post<any>('/api/auth/login', { email, password })
      .pipe(tap(res => {
        if (res?.token) this.setToken(res.token);
      }));
  }

  signup(payload: any) {
    return this.http.post('/api/auth/signup', payload);
  }

  setToken(token: string) {
    // localStorage.setItem(this.tokenKey, token);
  }

  getToken(){ 
    return true; }

  logout(){
    // localStorage.removeItem(this.tokenKey);
    this.user$.next(null);
  }

  isLoggedIn(): boolean { return !!this.getToken(); }
  hasRole(role: string) {
    const u = this.user$.value;
    return u && u.role === role;
  }
}
