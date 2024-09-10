import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeHeroComponent } from '@app/components/home/home-hero/home-hero.component';
import { HomeProjectsComponent } from '@app/components/home/home-projects/home-projects.component';
import { interval, map } from 'rxjs';
import { HomeSkillsComponent } from '../../components/home/home-skills/home-skills.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeHeroComponent, HomeProjectsComponent, HomeSkillsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public loading$ = interval(1000).pipe(map((i) => i % 2 === 0));
}
