import { Component, inject } from '@angular/core';
import { GameService } from '../../../../core/services/game/game.service';
import { MathTricksConfig, MathTricksResult } from '../../types/math-tricks.types';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from "../../../../shared/components/button/button.component";

@Component({
  selector: 'app-game-summary',
  imports: [ButtonComponent],
  templateUrl: './game-summary.component.html',
  styleUrl: './game-summary.component.scss',
})
export class GameSummaryComponent {
  private game = inject(GameService<MathTricksConfig, MathTricksResult>);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  result = this.game.result;
  bestResult = this.game.bestResult;

  playAgain() {
    this.game.restartGame();
    this.router.navigate(['../play'], { relativeTo: this.route });
  }

  goToSetup() {
    this.game.resetAll();
    this.router.navigate(['../setup'], { relativeTo: this.route });
  }

  goToHome() {
    this.game.resetAll();
    this.router.navigate(['/']);
  }
}
