import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Fipenator',
      description: `Um site online que permite aos usuários pesquisar informações atualizadas sobre o valor de mercado de veículos.`,
      image: 'assets/img/projects/fipenator.png',
      link: 'https://fipenator.kaualf.com',
      github: 'https://github.com/kaualandi/fipenator',
    },
    {
      title: 'LF - Elétrica',
      description: `Portfólio contendo: fotos diretas do Instagram, formação e contato de um eletricista que atua na região de Rio das Ostras.`,
      image: 'assets/img/projects/lf.png',
      link: 'https://lenilsonfernando.com.br',
      github: 'https://github.com/kaualandi/lenilson',
    },
    {
      title: 'Jogo da Memória',
      description: `Um jogo da memória simples, com 16 cartas, que tem como tema das cartas, dois artistas de rua da região.`,
      image: 'assets/img/projects/memory-game.png',
      link: 'https://memory.kaualf.com',
      github: 'https://github.com/kaualandi/memoryGame',
    },
    {
      title: 'Icaro Paiva',
      description: `Portfólio de um fotógrafo com suas fotos já tiradas, suas qualificações e informações de contato.`,
      image: 'assets/img/projects/icaro.png',
      link: 'https://icaropaiva.netlify.app',
      github: 'https://github.com/kaualandi/icaropaiva',
    },
  ];
}
