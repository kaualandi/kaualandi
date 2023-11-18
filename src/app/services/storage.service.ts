import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private cookieService: CookieService, private router: Router) {}

  UserSubject = new Subject<void>();
  myUser: IUser = {} as IUser;

  get myself() {
    return this.myUser;
  }

  set myself(user: IUser) {
    this.myUser = user;
  }

  watchUser() {
    return this.UserSubject.asObservable();
  }

  unwatchUser() {
    this.UserSubject.unsubscribe();
  }

  changeUser(): void {
    this.UserSubject.next();
  }

  get token() {
    if (this.cookies) {
      return this.cookieService.get('token');
    } else {
      return sessionStorage.getItem('token');
    }
  }

  /**
   * Função para setar o token no cookie
   * @param token Token que vem da API
   * @param keep Se true, o cookie expira em 60 dias, se false, o cookie expira quando o browser é fechado
   * @return void
   *
   * @author Kauã Landi
   */
  setToken(token: string, keep = false): void {
    if (this.cookies) {
      this.cookieService.set(
        'token',
        token,
        keep ? 60 : undefined,
        '/',
        undefined,
        this.ssl,
        'Strict'
      );
    } else {
      sessionStorage.setItem('token', token);
    }
  }

  get cookies() {
    return localStorage.getItem('cookies') === 'true';
  }

  set cookies(value: boolean) {
    localStorage.setItem('cookies', value.toString());
  }

  logout() {
    this.setToken('', false);
    this.router.navigate(['/login']);
  }

  get ssl() {
    return location.protocol === 'https:';
  }
}
