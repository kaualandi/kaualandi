import { Routes } from '@angular/router';
import { unauthGuard } from './guards/unauth.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [unauthGuard],
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [unauthGuard],
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'rescure-password',
    loadComponent: () =>
      import('./pages/rescure-password/rescure-password.component').then(
        (m) => m.RescurePasswordComponent
      ),
  },
  {
    path: '',
    // canActivate: [authGuard],
    loadComponent: () =>
      import('./components/navbar/navbar.component').then(
        (m) => m.NavbarComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'roadmap',
        loadComponent: () =>
          import('./pages/roadmap/roadmap.component').then(
            (m) => m.RoadmapComponent
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./components/shared/page-error/page-error.component').then(
            (m) => m.PageErrorComponent
          ),
        data: { error: 404 },
      },
    ],
  },
];
