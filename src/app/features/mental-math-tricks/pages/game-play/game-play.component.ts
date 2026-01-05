import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MathQuestionHistory, MathTricksConfig, MathTricksResult } from '../../types/math-tricks.types';
import { GameService } from '../../../../core/services/game/game.service';
import { CountdownComponent } from '../../../../shared/components/countdown/countdown.component';
import { TimerComponent } from '../../../../shared/components/timer/timer.component';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { NumericKeyboardComponent } from '../../../../shared/components/numeric-keyboard/numeric-keyboard.component';
import { SoundService } from '../../../../core/services/sound/sound.service';
import { KeyboardControlDirective } from '../../../../core/directives/keyboard/keyboard.directive';
import { KeyboardService } from '../../../../core/services/keyboard/keyboard.service';

type GameStatus = 'countdown' | 'running' | 'finished';

@Component({
  selector: 'app-game-play',
  standalone: true,
  imports: [
    CountdownComponent,
    TimerComponent,
    InputTextComponent,
    ReactiveFormsModule,
  
    ButtonComponent,
    NumericKeyboardComponent
  ],
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.scss',
})
export class GamePlayComponent {
  private game = inject(GameService<MathTricksConfig, MathTricksResult>);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private soundService = inject(SoundService);
  protected keyboardService = inject(KeyboardService);

  config = this.game.config() ?? { timeLimit: 60, enabledTricks: ['multiply11'] };

  status = signal<GameStatus>('countdown');
  correctAnswers = signal(0);
  wrongAnswers = signal(0);
  isWrong = signal(false);
  showSuccess = signal(false);
  history = signal<MathQuestionHistory[]>([]);

  currentQuestion = signal<{ text: string; answer: number; id: number }>({
    text: '', answer: 0, id: 0,
  });
  
  answerControl = new FormControl<string>('', [Validators.required]);

  onCountdownFinished() {
    this.status.set('running');
    this.generateNewQuestion();
  }

  generateNewQuestion() {
    const tricks = this.config.enabledTricks;
    const selectedTrick = tricks[Math.floor(Math.random() * tricks.length)];
    let text = '', answer = 0;

    switch (selectedTrick) {
      case 'multiply11':
        const num = Math.floor(Math.random() * 900) + 10;
        text = `${num} × 11`;
        answer = num * 11;
        break;
      case 'sameFirstEnd5':
        const tens = Math.floor(Math.random() * 9) + 1;
        const val = tens * 10 + 5;
        text = `${val} × ${val}`;
        answer = val * val;
        break;
      case 'sumTenUnits':
        const t = Math.floor(Math.random() * 9) + 1;
        const u1 = Math.floor(Math.random() * 9) + 1;
        const n1 = t * 10 + u1;
        const n2 = t * 10 + (10 - u1);
        text = `${n1} × ${n2}`;
        answer = n1 * n2;
        break;
    }

    this.currentQuestion.set({ text, answer, id: Date.now() });
    this.answerControl.reset('');
  }

  handleKeyboardClick(value: number | 'backspace' | 'enter') {
    const current = this.answerControl.value || '';
    if (typeof value === 'number') {
      this.answerControl.setValue(current + value);
    } else if (value === 'backspace') {
      this.answerControl.setValue(current.slice(0, -1));
    } else if (value === 'enter') {
      this.checkAnswer();
    }
  }

  checkAnswer() {
    if (this.answerControl.invalid) return;

    const userAnswer = Number(this.answerControl.value);
    const correctAnswer = this.currentQuestion().answer;
    const isCorrect = userAnswer === correctAnswer;

    this.history.update((h) => [...h, { question: this.currentQuestion().text, userAnswer, correctAnswer, isCorrect }]);

    if (isCorrect) {
      this.soundService.play('correct');
      this.triggerSuccess();
      this.correctAnswers.update((v) => v + 1);
      this.generateNewQuestion();
    } else {
      this.soundService.play('wrong');
      this.wrongAnswers.update((v) => v + 1);
      this.triggerError();
    }
  }

  private triggerSuccess() {
    this.showSuccess.set(true);
    setTimeout(() => this.showSuccess.set(false), 400);
  }

  private triggerError() {
    this.isWrong.set(true);
    this.answerControl.reset('');
    setTimeout(() => this.isWrong.set(false), 400);
  }

  finishGame() {
    if (this.status() === 'finished') return;
    this.status.set('finished');
    const total = this.history().length;
    const accuracy = total > 0 ? Math.round((this.correctAnswers() / total) * 100) : 0;

    const result = {
      totalQuestions: total,
      correctAnswers: this.correctAnswers(),
      wrongAnswers: this.wrongAnswers(),
      accuracy,
      history: this.history(),
    };

    this.game.setGameResult(result, {
      gameId: `math-tricks-${this.config.timeLimit}`,
      isBetterFn: (curr, best) => curr.correctAnswers > best.correctAnswers
    });

    this.router.navigate(['../summary'], { relativeTo: this.route });
  }
}