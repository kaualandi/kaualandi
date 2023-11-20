import { Component, Input } from '@angular/core';
import { IRepo } from 'src/app/models/projects';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  @Input() repo = {} as IRepo;
}
