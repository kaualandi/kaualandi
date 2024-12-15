import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  defaultLang = 'pt-br';

  private translateService = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  private keySavedLang = 'language';

  constructor(
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem(this.keySavedLang);
      if (savedLang) {
        this.defaultLang = savedLang;
      }
      this.translateService.setDefaultLang(this.defaultLang);
      this.translateService.use(this.defaultLang);
    }
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.keySavedLang, lang);
    }
  }
}
