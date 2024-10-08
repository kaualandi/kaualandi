import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-skills',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './home-skills.component.html',
  styleUrl: './home-skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSkillsComponent {}
