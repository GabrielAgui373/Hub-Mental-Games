import { Component, inject } from '@angular/core';
import { NumberSumStore } from '../../store/number-sum.store';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from "../../../../shared/components/button/button.component";

@Component({
  selector: 'app-game-summary',
  imports: [ButtonComponent],
  templateUrl: './game-summary.component.html',
  styleUrl: './game-summary.component.scss',
})
export class GameSummaryComponent {
  private store = inject(NumberSumStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  result = this.store.result;

  playAgain() {
    this.store.restartGame();
    this.router.navigate(['../play'], { relativeTo: this.route });
  }

  goToSetup() {
    this.store.restartGame(); 
    this.router.navigate(['../setup'], { relativeTo: this.route });
  }

  goToHome() {
    this.store.resetAll();
    this.router.navigate(['/']); 
  }
}
