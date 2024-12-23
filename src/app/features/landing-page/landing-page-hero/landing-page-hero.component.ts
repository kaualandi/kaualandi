import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ToggleThemeComponent } from '@app/shared/components/toggle-theme/toggle-theme.component';
import { ScrollToDirective } from '@app/shared/directives/scroll-to.directive';
import { IconDirective } from '../../../shared/directives/icon.directive';

@Component({
  selector: 'kaua-landing-page-hero',
  standalone: true,
  imports: [
    MatButtonModule,
    IconDirective,
    NgOptimizedImage,
    ToggleThemeComponent,
    ScrollToDirective,
  ],
  templateUrl: './landing-page-hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageHeroComponent {}
