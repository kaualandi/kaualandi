import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROJECTS } from '@app/constants/projects';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProjectsListComponent } from '../../components/shared/projects-list/projects-list.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [FooterComponent, ProjectsListComponent, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  public completedApplications = PROJECTS.filter((p) => p.type === 'complete');
  public smallProjects = PROJECTS.filter((p) => p.type === 'small');
}
