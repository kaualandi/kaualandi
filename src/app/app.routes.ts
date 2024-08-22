import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/navbar/navbar.component').then(
        (m) => m.NavbarComponent
      ),
    children: [],
  },
];
