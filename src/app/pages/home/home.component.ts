import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeHeroComponent } from '@app/components/home/home-hero/home-hero.component';
import { HomeProjectsComponent } from '@app/components/home/home-projects/home-projects.component';
import { interval, map } from 'rxjs';
import { HomeAboutMeComponent } from '../../components/home/home-about-me/home-about-me.component';
import { HomeSkillsComponent } from '../../components/home/home-skills/home-skills.component';
import { HomeContactsComponent } from '../../components/home/home-contacts/home-contacts.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeHeroComponent,
    HomeProjectsComponent,
    HomeSkillsComponent,
    HomeAboutMeComponent,
    HomeContactsComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public loading$ = interval(1000).pipe(map((i) => i % 2 === 0));
}
