import { IProject } from '@app/models/projects';

export const PROJECTS: IProject[] = [
  {
    translatePrefix: 'blackskull-pharma',
    image: 'assets/images/projects/blackskull-pharma.png',
    link: 'https://blackskullpharma.com.br/',
    favorite: true,
    type: 'complete',
    technologies: ['Shopify', 'NextJS'],
  },
  {
    translatePrefix: 'tria-health',
    image: 'assets/images/projects/tria-health.png',
    link: 'https://tria.health/',
    favorite: true,
    type: 'small',
    technologies: ['Angular', 'SCSS'],
  },
  {
    translatePrefix: 'marica-filmes',
    image: 'assets/images/projects/marica-filmes.png',
    link: 'https://maricafilmes.com.br/',
    favorite: true,
    type: 'complete',
    technologies: ['Angular', 'SCSS', 'Django'],
  },
];
