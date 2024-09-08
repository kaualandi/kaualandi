import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/welcome/welcome.component').then(
        (m) => m.WelcomeComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/navbar/navbar.component').then(
        (m) => m.NavbarComponent
      ),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];
