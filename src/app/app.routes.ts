import { Routes } from '@angular/router';
import { DetailComponentModule } from './detail/detail.component';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.component').then((m) => m.HomeComponentModule),
  },
  {
    path: 'detail/:id',
    loadChildren: () =>
      import('./detail/detail.component').then((m) => DetailComponentModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
