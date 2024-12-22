import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HorizontalScrollComponent } from '../../../shared/components/horizontal-scroll/horizontal-scroll.component';
import { IconDirective } from '../../../shared/directives/icon.directive';

interface ITechnology {
  name: string;
  logo: keyof IconDirective['icon'];
  url: string;
}

@Component({
  selector: 'kaua-landing-page-technologies',
  standalone: true,
  imports: [
    CommonModule,
    HorizontalScrollComponent,
    MatButtonModule,
    IconDirective,
  ],
  templateUrl: './landing-page-technologies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageTechnologiesComponent {
  public technologies: ITechnology[] = [
    {
      name: 'Angular',
      logo: 'angular',
      url: 'https://angular.dev/',
    },
    {
      name: 'Next.js',
      logo: 'nextjs',
      url: 'https://nextjs.org/',
    },
    {
      name: 'Sass',
      logo: 'sass',
      url: 'https://sass-lang.com/',
    },
    {
      name: 'Typescript',
      logo: 'typescript',
      url: 'https://typescriptlang.org/',
    },
    {
      name: 'Node.js',
      logo: 'nodejs',
      url: 'https://nodejs.org/',
    },
    {
      name: 'NestJS',
      logo: 'nestjs',
      url: 'https://nestjs.com/',
    },
    {
      name: 'TailwindCSS',
      logo: 'tailwindcss',
      url: 'https://tailwindcss.com/',
    },
  ];
}
