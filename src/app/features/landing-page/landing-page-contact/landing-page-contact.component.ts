import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IconDirective } from '../../../shared/directives/icon.directive';

interface Contact {
  icon: keyof IconDirective['icon'];
  name: string;
  link: string;
}

@Component({
  selector: 'kaua-landing-page-contact',
  standalone: true,
  imports: [CommonModule, MatButtonModule, IconDirective],
  templateUrl: './landing-page-contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageContactComponent {
  public contacts: Contact[] = [
    {
      icon: 'linkedin',
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/kaualandi',
    },
    {
      icon: 'instagram',
      name: 'Instagram',
      link: 'https://www.instagram.com/kauaalandi',
    },
    {
      icon: 'whatsapp',
      name: 'WhatsApp',
      link: 'https://wa.me/5521999222644',
    },
    {
      icon: 'github',
      name: 'GitHub',
      link: 'https://github.com/kaualandi',
    },
    {
      icon: 'envelope',
      name: 'E-mail',
      link: 'mailto:eu@kaualf.com',
    },
  ];
}
