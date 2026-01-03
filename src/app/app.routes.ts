import { Routes } from '@angular/router';
import { THEMES } from './core/services/theme/theme.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/home/home.component').then(m => m.HomeComponent)
  },
  {
    data: {
      theme: THEMES.NUMBER_SUM
    },
    path: 'games/number-sum',
    loadChildren: () =>
      import('./features/number-sum/number-sum.routes').then(
        (m) => m.NUMBER_SUM_ROUTES
      ),
  },
  {
    path: '**',
    redirectTo: '', //adicionar página não encontrada
  },
];
