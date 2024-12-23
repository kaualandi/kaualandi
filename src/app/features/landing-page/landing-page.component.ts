import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LandingPageHeroComponent } from './landing-page-hero/landing-page-hero.component';
import { LandingPageProjectsComponent } from './landing-page-projects/landing-page-projects.component';
import { LandingPageServicesComponent } from './landing-page-services/landing-page-services.component';
import { LandingPageTechnologiesComponent } from './landing-page-technologies/landing-page-technologies.component';
import { LandingPageContactComponent } from './landing-page-contact/landing-page-contact.component';

@Component({
  selector: 'kaua-landing-page',
  standalone: true,
  imports: [
    MatButtonModule,
    LandingPageHeroComponent,
    LandingPageTechnologiesComponent,
    LandingPageProjectsComponent,
    LandingPageServicesComponent,
    LandingPageContactComponent,
  ],
  templateUrl: './landing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
