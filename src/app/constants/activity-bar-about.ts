import { IActivityBar } from '../models/ide';

export const ABOUT_ACTIVITY_BAR: IActivityBar[] = [
  {
    title: 'informações-pessoais',
    folders: [
      {
        title: 'biografia',
        route: '/about/bio',
        color: 'var(--accent-orange)',
        files: [
          {
            title: 'resumo',
            icon: 'markdown',
            route: '/about/bio/resume',
            external: false,
          },
          {
            title: 'conheça-me',
            icon: 'markdown',
            route: '/about/bio/know-me',
            external: false,
          },
        ],
      },
      {
        title: 'habilidades',
        route: '/about/skills',
        color: 'var(--accent-purple)',
        files: [
          {
            title: 'principais',
            icon: 'markdown',
            route: '/about/skills/main',
            external: false,
          },
          {
            title: 'outras',
            icon: 'markdown',
            route: '/about/skills/other',
            external: false,
          },
          {
            title: 'em breve',
            icon: 'markdown',
            route: '/about/skills/soon',
            external: false,
          },
        ],
      },
    ],
    files: [],
  },
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
      {
        title: '/in/kaualandi',
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
