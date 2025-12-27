import { Routes } from '@angular/router';
import { gameConfiguredGuard } from '../../core/guards/game-configured.guard';
import { gameFinishedGuard } from '../../core/guards/game-finished.guard';

export const NUMBER_SUM_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'setup',
    pathMatch: 'full',
  },
  {
    path: 'setup',
    loadComponent: () =>
      import('./pages/game-config/game-config.component').then(
        (m) => m.GameConfigComponent
      ),
  },
  {
    path: 'play',
    loadComponent: () =>
      import('./pages/game-play/game-play.component').then(
        (m) => m.GamePlayComponent
      ),
    canActivate: [gameConfiguredGuard],
  },
  {
    path: 'summary',
    loadComponent: () =>
      import('./pages/game-summary/game-summary.component').then(
        (m) => m.GameSummaryComponent
      ),
    canActivate: [gameFinishedGuard],
  },
];
