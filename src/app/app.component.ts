import { isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '@env';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private theme = inject(ThemeService);
  private platformId = inject(PLATFORM_ID);

  public constructor() {
    console.log(
      `Angular is using ${environment.production ? 'production' : 'development'} variables`
    );
  }

  public ngOnInit() {
    if (!isPlatformServer(this.platformId)) {
      this.theme.loadCurrentTheme('dark');
    }
  }
}
