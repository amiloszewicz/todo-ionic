import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.component').then((m) => m.HomeComponentModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
