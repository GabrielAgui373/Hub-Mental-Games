import { Component, inject, signal } from '@angular/core';
import { NumberSumStore } from '../../store/number-sum.store';
import { finalize, interval, map, take, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-game-play',
  imports: [InputTextComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.scss',
})
export class GamePlayComponent {
  private store = inject(NumberSumStore);

  answer = new FormControl<number | null>(null, Validators.required);
  finish = signal(false);

  config = {
    amount: this.store.config()?.amount ?? 10,
    digits: this.store.config()?.digits ?? 1,
    interval: this.store.config()?.interval ?? 1000,
  };

  gameSequence = this.getNumbers(this.config.amount, this.config.digits);
  private result = this.gameSequence.reduce((prev, curr) => prev + curr, 0);

  numbers$ = interval(this.config.interval).pipe(
    take(this.config.amount),
    map((index) => this.gameSequence[index]),
    finalize(() => {
      setTimeout(() => {
        this.finish.set(true);
        this.answer
      }, this.config.interval);
    })
  );

  currentNumber = toSignal(this.numbers$);

  checkResult() {
    if (Number(this.answer.value) === this.result) {
      alert('Acertou! Soma: ' + this.result);
    } else {
      alert('Errou! A soma era: ' + this.result);
    }
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
