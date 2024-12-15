import { Injectable, signal } from '@angular/core';

export type Themes = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private userTheme = signal<Themes>('light');

  public get theme() {
    return this.userTheme();
  }

  public toggleUserTheme() {
    const theme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme(theme);
    return theme;
  }

  public loadCurrentTheme(theme?: Themes) {
    if (theme) {
      this.setTheme(theme);
      return;
    }

    const inLocal = localStorage.getItem('theme') as Themes;
    if (inLocal) {
      this.userTheme.set(inLocal);
      this.setTheme(inLocal);
      return inLocal;
    }

    const deviceMode = window.matchMedia('(prefers-color-scheme: dark)');
    if (deviceMode.matches) {
      this.setTheme('dark');
      return 'dark';
    }
    this.setTheme('light');
    return 'light';
  }

  private setTheme(theme: Themes) {
    this.userTheme.set(theme);
    localStorage.setItem('theme', theme);
    const html = document.querySelector('html');

    if (theme === 'light') {
      html?.classList.remove('dark');
    } else {
      html?.classList.add('dark');
    }
  }
}
