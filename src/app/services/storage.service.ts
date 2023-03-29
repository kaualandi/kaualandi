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

  userTheme: 'light' | 'dark' = 'light';

  socials = [
    {
      name: 'WhatsApp',
      icon: 'whatsapp',
      link: 'https://wa.me/5521999222644',
    },
    {
      name: 'Email',
      icon: 'envelop',
      link: 'mailto:eu@kaualf.com',
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      link: 'https://www.linkedin.com/in/kaualf/',
    },
    {
      name: 'GitHub',
      icon: 'github',
      link: 'https://github.com/kaualandi',
    },
    {
      name: 'Twitter',
      icon: 'twitter',
      link: 'https://twitter.com/kauaalandi',
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      link: 'https://www.instagram.com/kaua.landi/',
    },
  ];

  get myself() {
    return this.myUser;
  }

  set myself(user: IUser) {
    this.myUser = user;
  }

  get theme() {
    return this.userTheme;
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
    return this.cookieService.get('token');
  }

  /**
   * Função para setar o token no cookie
   * @param token Token que vem da API
   * @param keep Se true, o cookie expira em 60 dias, se false, o cookie expira quando o browser é fechado
   * @returns void
   */
  setToken(token: string, keep = false): void {
    this.cookieService.set(
      'token',
      token,
      keep ? 60 : undefined,
      '/',
      undefined,
      true,
      'Strict'
    );
  }

  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }

  toggleUserTheme() {
    if (this.userTheme === 'light') {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  loadCurrentTheme() {
    const inLocal = localStorage.getItem('theme') as 'light' | 'dark';
    if (inLocal) {
      this.userTheme = inLocal;
      this.setTheme(inLocal);
      return inLocal;
    }

    const deviceMode = window.matchMedia('(prefers-color-scheme: dark)');
    if (deviceMode.matches) {
      this.userTheme = 'dark';
      this.setTheme('dark');
      return 'dark';
    }
    this.setTheme('light');
    return 'light';
  }

  setTheme(theme: 'light' | 'dark') {
    this.userTheme = theme;
    localStorage.setItem('theme', theme);
    const html = document.querySelector('html');

    if (theme === 'light') {
      html?.classList.remove('dark');
    } else {
      html?.classList.toggle('dark');
    }
  }
}
