import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-projects',
  standalone: true,
  imports: [],
  templateUrl: './home-projects.component.html',
  styleUrl: './home-projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeProjectsComponent {

}
