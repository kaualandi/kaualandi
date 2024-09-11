import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-about-me',
  standalone: true,
  imports: [MatButtonModule, TranslateModule, RouterModule],
  templateUrl: './home-about-me.component.html',
  styleUrl: './home-about-me.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeAboutMeComponent {}
