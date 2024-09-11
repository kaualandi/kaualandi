import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SOCIAL_LINKS_HOME_CONTACTS } from '@app/constants/social';
import { IconDirective } from '@app/directives/icon.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-contacts',
  standalone: true,
  imports: [TranslateModule, IconDirective],
  templateUrl: './home-contacts.component.html',
  styleUrl: './home-contacts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeContactsComponent {
  public socialLinks = SOCIAL_LINKS_HOME_CONTACTS;
}
