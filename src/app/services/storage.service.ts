import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private cookieService = inject(CookieService);
  private platformId = inject(PLATFORM_ID);

  private UserSubject = new Subject<void>();
  private myUser: IUser = {} as IUser;

  public get myself() {
    return this.myUser;
  }

  public set myself(user: IUser) {
    this.myUser = user;
  }

  public watchUser() {
    return this.UserSubject.asObservable();
  }

  public changeUser(): void {
    this.UserSubject.next();
  }

  public get token() {
    if (this.cookies) {
      return this.cookieService.get('token');
    } else {
      return sessionStorage.getItem('token');
    }
  }

  public get cookies() {
    return localStorage.getItem('cookies') === 'true';
  }

  public set cookies(value: boolean) {
    localStorage.setItem('cookies', value.toString());
  }
}
