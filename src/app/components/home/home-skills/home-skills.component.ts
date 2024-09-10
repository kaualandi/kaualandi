import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-skills',
  standalone: true,
  imports: [],
  templateUrl: './home-skills.component.html',
  styleUrl: './home-skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSkillsComponent {}
