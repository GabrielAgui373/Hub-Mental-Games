import { Component, inject, signal } from '@angular/core';
import { filter, finalize, map, switchMap, take, timer } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { NumberSumConfig, NumberSumResult } from '../../types/number-sum.types';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownComponent } from '../../../../shared/components/countdown/countdown.component';
import { GameService } from '../../../../core/services/game/game.service';

interface GameStep {
  value: number;
  id: string;
}
type GameStatus = 'countdown' | 'running' | 'finished';

@Component({
  selector: 'app-game-play',
  imports: [
    InputTextComponent,
    ButtonComponent,
    ReactiveFormsModule,
    CountdownComponent,
  ],
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.scss',
})
export class GamePlayComponent {
  private game = inject(GameService<NumberSumConfig, NumberSumResult>);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  config = {
    amount: this.game.config()?.amount ?? 10,
    digits: this.game.config()?.digits ?? 1,
    interval: this.game.config()?.interval ?? 1000,
  };

  gameSequence = this.generateGameSequence(
    this.config.amount,
    this.config.digits
  );
  private resultSum = this.gameSequence.reduce((acc, curr) => acc + curr, 0);

  status = signal<GameStatus>('countdown');

  answerControl = new FormControl<number | null>(null, Validators.required);

  private gameLoop$ = toObservable(this.status).pipe(
    filter((s) => s === 'running'),

    switchMap(() =>
      timer(100, this.config.interval).pipe(
        take(this.config.amount),
        map(
          (index) =>
            ({
              value: this.gameSequence[index],
              id: `step-${index}`,
            } as GameStep)
        ),

        finalize(() => {
          setTimeout(() => {
            this.status.set('finished');
          }, this.config.interval);
        })
      )
    )
  );

  currentStep = toSignal(this.gameLoop$);

  onCountdownFinished() {
    this.status.set('running');
  }

  checkResult() {
    if (this.answerControl.invalid) return;

    const userAnswer = Number(this.answerControl.value);
    const isCorrect = userAnswer === this.resultSum;

    const resultData: NumberSumResult = {
      correctSum: this.resultSum,
      userAnswer: userAnswer,
      isCorrect: isCorrect,
      numbersShown: this.gameSequence,
    };

    this.game.setGameResult(resultData);
    this.router.navigate(['../summary'], { relativeTo: this.route });
  }

  generateGameSequence(amount: number, digits: number): number[] {
    const numbers: number[] = [];

    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;

    for (let index = 0; index < amount; index++) {
      numbers.push(this.generateRandomNumbers(min, max));
    }

    return numbers;
  }

  generateRandomNumbers(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
