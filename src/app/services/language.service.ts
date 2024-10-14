import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);
  private plataformId = inject(PLATFORM_ID);

  public get current() {
    const allLangs = this.translate.getLangs();
    const storageLang = isPlatformBrowser(this.plataformId)
      ? localStorage.getItem('language')
      : '';
    const browserLang = allLangs.includes(this.translate.getBrowserLang() || '')
      ? this.translate.getBrowserLang()?.toLocaleLowerCase()
      : '';

    return this.translate.currentLang || storageLang || browserLang || 'pt-BR';
  }

  public set current(value: string) {
    localStorage.setItem('language', value);
  }
}
