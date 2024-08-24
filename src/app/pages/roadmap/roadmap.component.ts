import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './roadmap.component.html',
  styleUrl: './roadmap.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoadmapComponent {
  public items = [
    {
      title: 'SEO: Alteração de título',
      description:
        'Vá em <code>src/index.html</code> e altere o título da página. Vai encontrar algo como <code>&lt;title&gt;Boilerplate Angular&lt;/title&gt;</code>.',
    },
    {
      title: 'SEO: Alteração de cor da barra de status',
      description:
        'Vá em <code>src/index.html</code> e altere a cor da barra de status. Vai encontrar algo como <code>&lt;meta name="theme-color" content="#1976d2"&gt;</code>. Altere o valor dentro do content, ele vai ficar em cima da navbar (se tiver uma) em dispositivos móveis, então escolha uma cor que combine, provavelmente não será a cor primária.',
    },
    {
      title: 'SEO: Alteração de descrição',
      description:
        'Vá em <code>src/index.html</code> e altere a descrição da página. Vai encontrar algo como <code>&lt;meta name="description" content="..."&gt;</code>. Altere o valor dentro do content, ele é o que aparece no Google em baixo do seu título. Coloque algo que descreva bem o seu site para ser encontrado mais facilmente.',
    },
    {
      title: 'SEO: Alteração de keywords',
      description:
        'Vá em <code>src/index.html</code> e altere as palavras-chave da página. Vai encontrar algo como <code>&lt;meta name="keywords" content="..."&gt;</code>. Altere o valor dentro do content, ele é o que o Google usa para saber o que a sua página fala. Coloque palavras-chave que sejam relevantes para o seu site.',
    },
    {
      title: 'SEO: Adicione meta tags de Open Graph',
      description:
        'Vá em <code>src/index.html</code> e adicione as meta tags de Open Graph. Ele é o que o WhatsApp e outras redes usam para saber o que mostrar quando alguém compartilha o seu site. Coloque algo que seja interessante para quem for compartilhar, como uma prévia do site.',
    },
    {
      title: 'Personalização: Alteração de favicon',
      description:
        'Vá em <code>src/assets/favicon</code> e altere o favicon. Coloque a logo da empresa ou site. Use a extensão .ico para compatibilidade com todos os navegadores.',
    },
    {
      title: 'Personalização: Alteração de logo',
      description:
        'Vá em <code>src/assets/images</code> e altere a logo.png. Coloque a logo da empresa ou site. Use a extensão .svg ou .png.',
    },
    {
      title:
        'Personalização: Alteração dos icones para o manifest e o da Apple',
      description:
        'Vá em <code>src/assets/icons</code> e altere os icones obedecendo as dimensões, nome e extensão. Os ícones serão utilizados como app, então construa seus ícones esperando ve-los na sua gaveta de apps do celular. <a href="https://maskable.app/editor" target="_blank">Maskable Icon Generator</a> pode te ajudar.',
    },
    {
      title: 'Personalização: Altere as cores e títulos do app para o manifest',
      description:
        'Vá em <code>src/manifest.webmanifest</code> e altere as cores e títulos do app. Altere as chaves: name, short_name, theme_color e background_color.',
    },
    {
      title: 'Personalização: Alteração de cores do Angular Material',
      description:
        'Vá em <code>src/palette.scss</code> e altere as cores. Os links comentados são para te facilitar em como escolher as cores. Caso não tenha um "accent", duplique os valores do "primary".',
    },
    {
      title: 'Personalização: Escolha o tema',
      description:
        'O tema já se adequa automaticamente, mas caso queira forçar sempre escuro ou sempre claro, expecifique os valores "dark" ou "light" no arquivo <code>src/app/app.component.ts</code> dentro do método loadCurrentTheme.',
    },
    {
      title: 'Segurança: Rotas por autenticação',
      description:
        'Caso as rotas com navbar necessitem de autenticação, vá em <code>src/app/app.routes.ts</code> e adicione descomente <code>canActivate: [AuthGuard]</code>, algo próximo a linha 25.',
    },
  ];
}
