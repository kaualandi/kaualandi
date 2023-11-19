import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  activityBar = [
    {
      title: 'informações-pessoais',
      folders: [
        {
          title: 'biografia',
          route: '/about/biography',
          color: 'var(--accent-orange)',
          files: [
            {
              title: 'resumo',
              icon: 'markdown',
              route: '/about/biography/resume',
              external: false,
            },
          ],
        },
      ],
      files: [],
    },
    {
      title: 'contatos',
      folder: [],
      files: [
        {
          title: '(21) 99922-2644',
          icon: 'whatsapp',
          route: 'https://wa.me/5521999222644',
          external: true,
        },
        {
          title: '(21) 99922-2644',
          icon: 'phone',
          route: 'tel:+55 (21) 99922-2644',
          external: true,
        },
        {
          title: 'eu@kaualf.com',
          icon: 'email',
          route: 'mailto:eu@kaualf.com',
          external: true,
        },
        {
          title: '/in/kaualf',
          icon: 'linkedin',
          route: 'mailto:eu@kaualf.com',
          external: true,
        },
        {
          title: '/kaualandi',
          icon: 'github',
          route: 'github.com/kaualandi',
          external: true,
        },
        {
          title: '@kauaalandi',
          icon: 'twitter',
          route: 'https://twitter.com/kauaalandi',
          external: true,
        },
        {
          title: '@kauaalandi',
          icon: 'instagram',
          route: 'https://instagram.com/kauaalandi',
          external: true,
        },
      ],
    },
  ];
}
