import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'kaua-landing-page-projects',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './landing-page-projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageProjectsComponent {
  public projects = [
    {
      image: 'images/projects/blackskull-pharma.png',
      link: 'https://blackskullpharma.com.br/',
      technologies: ['Shopify', 'NextJS'],
      title: 'Blackskull Pharma',
      description: 'Produtos de alta performance para atletas',
    },
    {
      image: 'images/projects/tria-health.png',
      link: 'https://tria.health/',
      technologies: ['Angular', 'SCSS'],
      title: 'Tria Health',
      description: 'Gerenciador de dados médicos',
    },
    {
      image: 'images/projects/marica-filmes.png',
      link: 'https://maricafilmes.com.br/',
      technologies: ['Angular', 'SCSS', 'Django'],
      title: 'Maricá Filmes',
      description: 'Streaming de vídeo para a prefeitura de Maricá',
    },
    {
      image: 'images/projects/oficial-med.png',
      link: 'https://oficialmed.com.br/',
      technologies: ['Shopify'],
      title: 'Oficial Med',
      description: 'Farmácia de Manipulação e Indústria de Nutracêuticos',
    },
    {
      image: 'images/projects/portfolio-ide.png',
      link: 'https://dev.kaualf.com/',
      technologies: ['Angular', 'SCSS'],
      title: 'Portfólio IDE',
      description: 'Portfólio em formato de IDE (editor de código) com jogo',
    },
    {
      image: 'images/projects/nip.png',
      link: 'https://nip.imb.br/',
      technologies: ['Angular', 'SCSS', 'Django', 'Analytics', 'SEO'],
      title: 'NIP',
      description:
        'Portal Imobiliário do Rio focado em venda e aluguel de imóveis',
    },
    {
      image: 'images/projects/bot-wpp-flow.png',
      link: 'https://github.com/kaualandi/bot-whatsapp-flow',
      technologies: ['NodeJS', 'JSON Server', 'DI'],
      title: 'Chatbot de WhatsApp com fluxo',
      description:
        'Chatbot de WhatsApp com fluxo para atendimento ao cliente automatizado',
    },
    {
      image: 'images/projects/mae-estar.png',
      link: 'https://www.maeestar.com.br/',
      technologies: ['Angular', 'SCSS', 'Analytics'],
      title: 'Mãe Estar',
      description: 'Um aplicativo de saúde para mães, pais e cuidadores',
    },
    {
      image: 'images/projects/fw2svg.png',
      link: 'https://fw2svg.kaualf.com/',
      technologies: ['HTML', 'CSS', 'Javascript', 'Bootstrap'],
      title: 'FW2SVG',
      description:
        'Tranforma a tag HTML dos ícones do Font Awesome em SVG para serem usados em qualquer lugar',
    },
  ];
}
