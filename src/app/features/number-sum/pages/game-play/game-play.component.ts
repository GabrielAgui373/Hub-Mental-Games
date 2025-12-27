import { Component, inject, signal } from '@angular/core';
import { NumberSumStore } from '../../store/number-sum.store';
import { concat, finalize, interval, map, take, tap, timer } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { NumberSumResult } from '../../store/number-sum.types';
import { ActivatedRoute, Router } from '@angular/router';

interface GameDisplayStep {
  value: string | number;
  isPrep: boolean;
}

@Component({
  selector: 'app-game-play',
  imports: [InputTextComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.scss',
})
export class GamePlayComponent {
  private store = inject(NumberSumStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  answer = new FormControl<number | null>(null, Validators.required);
  finish = signal(false);

  config = {
    amount: this.store.config()?.amount ?? 10,
    digits: this.store.config()?.digits ?? 1,
    interval: this.store.config()?.interval ?? 1000,
  };

  gameSequence = this.getNumbers(this.config.amount, this.config.digits);
  private result = this.gameSequence.reduce((prev, curr) => prev + curr, 0);

  private countdown$ = timer(500, 1000).pipe(
    take(3),
    map((i) => ({ 
      value: (3 - i).toString(), 
      isPrep: true 
    }))
  );

  private gamePlay$ = timer(1000, this.config.interval).pipe(
    take(this.config.amount),
    map((index) => ({ 
      value: this.gameSequence[index], 
      isPrep: false 
    }))
  );

  displayStream$ = concat(this.countdown$, this.gamePlay$).pipe(
    finalize(() => {
      setTimeout(() => {
        this.finish.set(true);
      }, this.config.interval);
    })
  );

  currentStep = toSignal<GameDisplayStep>(this.displayStream$);

  checkResult() {
   if (this.answer.invalid) return;

    const userAnswer = Number(this.answer.value);
    const isCorrect = userAnswer === this.result;

    const resultData: NumberSumResult = {
      correctSum: this.result,
      userAnswer: userAnswer,
      isCorrect: isCorrect,
      numbersShown: this.gameSequence
    };

    this.store.setGameResult(resultData);
    this.router.navigate(['../summary'], { relativeTo: this.route });
  }

  getNumbers(amount: number, digits: number): number[] {
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
