import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  names = [
    'João da Silva',
    'Maria de Fátima',
    'Carol do Santos',
    'Lucas dos Santos',
    'Ana e Luiz',
  ];
}
