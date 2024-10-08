import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IProject } from '@app/models/projects';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [MatButtonModule, TranslateModule],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent {
  @Input() public projects: IProject[] = [];

  public getProjectTitle(project: IProject) {
    return `projects.${project.translatePrefix}.title`;
  }

  public getProjectDescription(project: IProject) {
    return `projects.${project.translatePrefix}.description`;
  }
}
