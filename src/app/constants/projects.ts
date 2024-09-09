import { IProject } from '@app/models/projects';

export const PROJECTS: IProject[] = [
  {
    title: 'Blackskull Pharma',
    description: 'Produtos de alta performance para atletas',
    image: 'assets/images/projects/blackskull-pharma.png',
    link: 'https://blackskullpharma.com.br/',
    favorite: true,
    type: 'complete',
    technologies: ['Shopify', 'NextJS'],
  },
  {
    title: 'Tria Health',
    description: 'Gerenciador de dados médicos',
    image: 'assets/images/projects/tria-health.png',
    link: 'https://tria.health/',
    favorite: true,
    type: 'small',
    technologies: ['Angular', 'SCSS'],
  },
  {
    title: 'Maricá Filmes',
    description: 'Streaming de vídeo para a prefeitura de Maricá',
    image: 'assets/images/projects/marica-filmes.png',
    link: 'https://maricafilmes.com.br/',
    favorite: true,
    type: 'complete',
    technologies: ['Angular', 'SCSS', 'Django'],
  },
];
