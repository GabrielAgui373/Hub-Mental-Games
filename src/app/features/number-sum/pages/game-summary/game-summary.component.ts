import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { GameService } from '../../../../core/services/game/game.service';
import { NumberSumConfig, NumberSumResult } from '../../types/number-sum.types';

@Component({
  selector: 'app-game-summary',
  imports: [ButtonComponent],
  templateUrl: './game-summary.component.html',
  styleUrl: './game-summary.component.scss',
})
export class GameSummaryComponent {
  private game = inject(GameService<NumberSumConfig, NumberSumResult>);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  result = this.game.result;

  playAgain() {
    this.game.restartGame();
    this.router.navigate(['../play'], { relativeTo: this.route });
  }

  goToSetup() {
    this.game.restartGame();
    this.router.navigate(['../setup'], { relativeTo: this.route });
  }

  goToHome() {
    this.game.resetAll();
    this.router.navigate(['/']);
  }
}
