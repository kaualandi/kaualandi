import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  ThemeSubject = new Subject<void>();

  userTheme: 'light' | 'dark' = 'light';

  get theme() {
    return this.userTheme;
  }

  watchTheme() {
    return this.ThemeSubject.asObservable();
  }

  unwatchTheme() {
    this.ThemeSubject.unsubscribe();
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
