import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LandingPageHeroComponent } from './landing-page-hero/landing-page-hero.component';

@Component({
  selector: 'kaua-landing-page',
  standalone: true,
  imports: [MatButtonModule, LandingPageHeroComponent],
  templateUrl: './landing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
