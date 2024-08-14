import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LanguageService } from '@app/services/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'lang-select',
  standalone: true,
  imports: [
    SharedModule,
    MatMenuModule,
    MatTooltipModule,
    TranslateModule,
    MatButtonModule,
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

  public ngOnInit(): void {
    this.selected = this.language.current;
  }

  public selectLang(lang: string) {
    this.translate.use(lang);
    this.language.current = lang;
    this.selected = lang;
  }
}
