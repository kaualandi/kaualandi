import { IActivityBar } from '../models/ide';

export const CONTACT_ACTIVITY_BAR: IActivityBar[] = [
  {
    title: 'contatos',
    folders: [],
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
    ],
  },
  {
    title: 'me-encontre-também',
    folders: [],
    files: [
      {
        title: '/in/kaualf',
        icon: 'linkedin',
        route: 'https://www.linkedin.com/in/kaualandi/',
        external: true,
      },
      {
        title: '/kaualandi',
        icon: 'github',
        route: 'https://github.com/kaualandi',
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
