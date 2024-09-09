import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PROJECTS } from '@app/constants/projects';
import { ProjectsListComponent } from '../../shared/projects-list/projects-list.component';

@Component({
  selector: 'app-home-projects',
  standalone: true,
  imports: [MatButtonModule, RouterModule, ProjectsListComponent],
  templateUrl: './home-projects.component.html',
  styleUrl: './home-projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeProjectsComponent {
  public projects = PROJECTS.filter((project) => project.favorite);
}
