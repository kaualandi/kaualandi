import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject as vercelAnalytics } from '@vercel/analytics';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'kaua-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private theme = inject(ThemeService);

  public constructor() {
    afterNextRender(() => {
      this.theme.loadCurrentTheme();
      vercelAnalytics();
    });
  }
}
