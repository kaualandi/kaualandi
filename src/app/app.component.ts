import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { ThemeService } from './shared/services/theme.service';
import { TranslationService } from './shared/services/translation.service';

@Component({
  selector: 'kaua-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private theme = inject(ThemeService);
  private language = inject(TranslationService);

  public constructor() {
    console.log(
      `Angular is using ${environment.production ? 'production' : 'development'} variables`
    );

    afterNextRender(() => {
      this.theme.loadCurrentTheme();
    });
  }
}
