import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { IconDirective } from '@app/directives/icon.directive';
import { LanguageService } from '@app/services/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'lang-select',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    TranslateModule,
    MatMenuModule,
    IconDirective,
  ],
  templateUrl: './lang-select.component.html',
  styleUrl: './lang-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangSelectComponent implements OnInit {
  private translate = inject(TranslateService);
  private language = inject(LanguageService);

  public langs = ['pt-BR', 'en'];
  public selected = this.langs[0];
  public optionsLangs = [
    { value: 'pt-BR', label: 'BR' },
    { value: 'en', label: 'US' },
  ];

  public ngOnInit(): void {
    this.selected = this.language.current;
  }

  public selectLang(lang: string) {
    console.log('lang', lang);

    this.translate.use(lang);
    this.language.current = lang;
    this.selected = lang;
  }

  public get currentViewer() {
    return this.optionsLangs.find((o) => o.value === this.selected)?.label;
  }
}
