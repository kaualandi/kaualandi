import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EMAIL, SOCIAL_LINKS_FOOTER } from '@app/constants/social';
import { IconDirective } from '@app/directives/icon.directive';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, IconDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public email = EMAIL;
  public socialLinks = SOCIAL_LINKS_FOOTER;
  public year = moment().format('YYYY');
}
