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
        path: 'projects',
        loadComponent: () =>
          import('./pages/projects/projects.component').then(
            (m) => m.ProjectsComponent
          ),
      },
      {
        path: 'about-me',
        loadComponent: () =>
          import('./pages/about-me/about-me.component').then(
            (m) => m.AboutMeComponent
          ),
      },
      {
        path: 'contacts',
        loadComponent: () =>
          import('./pages/contacts/contacts.component').then(
            (m) => m.ContactsComponent
          ),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
