import { Component } from '@angular/core';
import { GameItem } from '../../core/models/game-item.model';
import { GameCardComponent } from "../../shared/components/game-card/game-card.component";

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
      description: 'Some os números rapidamente antes que o tempo acabe.',
      details: 'Vários números aparecerão na tela em intervalos configurados. Você deve memorizar e somar todos mentalmente. No final, digite o resultado total.',
      route: 'games/number-sum/setup'
    },
  ]
}
