import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '@app/shared/services/theme.service';

@Component({
  selector: 'toggle-theme',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './toggle-theme.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./toggle-theme.component.scss'],
})
export class ToggleThemeComponent implements OnInit {
  private themeService = inject(ThemeService);

  public darkThemeControl = new FormControl(false);
  private valueChanges =
    this.darkThemeControl.valueChanges.pipe(takeUntilDestroyed());

  public ngOnInit(): void {
    this.darkThemeControl.setValue(this.themeService.theme === 'dark');
    this.valueChanges.subscribe(() => {
      this.themeService.toggleUserTheme();
    });
  }

  public toggleTheme(e: Event) {
    e.stopPropagation();
    this.darkThemeControl.setValue(!this.darkThemeControl.value);
  }
}
