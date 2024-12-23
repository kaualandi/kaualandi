import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconDirective } from '../../../shared/directives/icon.directive';

export interface IService {
  icon: keyof IconDirective['icon'];
  title: string;
  description: string;
}

@Component({
  selector: 'kaua-landing-page-services',
  standalone: true,
  imports: [IconDirective],
  templateUrl: './landing-page-services.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageServicesComponent {
  public services: IService[] = [
    {
      icon: 'display_code',
      title: 'Websites e Aplicativos',
      description: 'Desenvolvimento de interfaces',
    },
    {
      icon: 'server',
      title: 'API e banco de dados',
      description: 'Criação de serviços do sistema',
    },
    {
      icon: 'robot',
      title: 'Chatbots e automações',
      description: 'Integração com AI e mensageiros',
    },
  ];
}
