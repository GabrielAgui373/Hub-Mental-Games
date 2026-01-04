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
    data: {
      theme: THEMES.MATH_TRICKS
    },
    path: 'games/math-tricks',
    loadChildren: () =>
      import('./features/mental-math-tricks/math-tricks.routes').then(
        (m) => m.MATH_TRICKS_ROUTES
      ),
  },
  {
    path: '**',
    redirectTo: '', //adicionar página não encontrada
  },
];
