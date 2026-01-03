import { Routes } from '@angular/router';
import { GameService } from '../../core/services/game/game.service';
import { gameConfiguredGuard } from '../../core/guards/game-configured.guard';
import { gameFinishedGuard } from '../../core/guards/game-finished.guard';

export const NUMBER_SUM_ROUTES: Routes = [
  {
    path: '',
    providers: [GameService], 
    data: { setupPath: '/games/number-sum/setup' },
    children: [
      { path: '', redirectTo: 'setup', pathMatch: 'full' },
      {
        path: 'setup',
        loadComponent: () => import('./pages/game-config/game-config.component').then(m => m.GameConfigComponent),
      },
      {
        path: 'play',
        canActivate: [gameConfiguredGuard],
        loadComponent: () => import('./pages/game-play/game-play.component').then(m => m.GamePlayComponent),
      },
      {
        path: 'summary',
        canActivate: [gameFinishedGuard],
        loadComponent: () => import('./pages/game-summary/game-summary.component').then(m => m.GameSummaryComponent),
      },
    ],
  },
];