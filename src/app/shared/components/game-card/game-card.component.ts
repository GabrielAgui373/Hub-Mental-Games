import { Component, input, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { GameItem } from '../../../core/models/game-item.model';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss'
})
export class GameCardComponent {
  game = input.required<GameItem>();
  expanded = signal(false);
  
  private router = inject(Router);

  toggleDetails() {
    this.expanded.update(v => !v);
  }

  navigateToGame() {
    this.router.navigate([this.game().route]);
  }
}