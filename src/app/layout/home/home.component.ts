import { Component } from '@angular/core';
import { GameItem } from '../../core/models/game-item.model';
import { GameCardComponent } from "../../shared/components/game-card/game-card.component";
import { THEMES } from '../../core/services/theme/theme.service';

@Component({
  selector: 'app-main',
  imports: [GameCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  games: GameItem[] = [
    {
      id: 'num-sum',
      title: 'Number Sum',
      description: 'Sum numbers quickly as they appear on the screen.',
      details: 'A sequence of numbers will be shown at set intervals. Memorize and sum them mentally, then provide the final total.',
      route: 'games/number-sum/setup',
      theme: THEMES.NUMBER_SUM,
    },
    {
      id: 'math-tricks',
      title: 'Mental Math Tricks',
      description: 'Master shortcuts and solve equations against the clock.',
      details: 'Solve as many operations as possible using special techniques like the Rule of 11, Square of 5, and Sum of 10 Units.',
      route: 'games/math-tricks/setup',
      theme: THEMES.MATH_TRICKS,
    }
  ];
}