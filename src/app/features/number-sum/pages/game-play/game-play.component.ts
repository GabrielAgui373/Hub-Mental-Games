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
import { NumericKeyboardComponent } from '../../../../shared/components/numeric-keyboard/numeric-keyboard.component';
import { KeyboardService } from '../../../../core/services/keyboard/keyboard.service';

interface GameStep {
  value: number;
  id: string;
}
type GameStatus = 'countdown' | 'running' | 'finished';

@Component({
  selector: 'app-game-play',
  standalone: true,
  imports: [
    InputTextComponent,
    ButtonComponent,
    ReactiveFormsModule,
    CountdownComponent,
    NumericKeyboardComponent,
  ],
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.scss',
})
export class GamePlayComponent {
  private game = inject(GameService<NumberSumConfig, NumberSumResult>);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected keyboardService = inject(KeyboardService);

  config = {
    amount: this.game.config()?.amount ?? 10,
    digits: this.game.config()?.digits ?? 1,
    interval: this.game.config()?.interval ?? 1000,
  };

  gameSequence = this.generateGameSequence(this.config.amount, this.config.digits);
  private resultSum = this.gameSequence.reduce((acc, curr) => acc + curr, 0);

  status = signal<GameStatus>('countdown');
  answerControl = new FormControl<string>('', Validators.required);

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

  handleKeyboardClick(value: number | 'backspace' | 'enter') {
    const current = this.answerControl.value || '';
    if (typeof value === 'number') {
      this.answerControl.setValue(current + value);
    } else if (value === 'backspace') {
      this.answerControl.setValue(current.slice(0, -1));
    } else if (value === 'enter') {
      if (this.answerControl.valid) this.checkResult();
    }
  }

  checkResult() {
    if (this.answerControl.invalid) return;

    const userAnswer = Number(this.answerControl.value);
    const resultData: NumberSumResult = {
      correctSum: this.resultSum,
      userAnswer: userAnswer,
      isCorrect: userAnswer === this.resultSum,
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