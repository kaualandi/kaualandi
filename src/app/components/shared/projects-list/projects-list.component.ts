import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IProject } from '@app/models/projects';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent {
  @Input() public projects: IProject[] = [];
}
