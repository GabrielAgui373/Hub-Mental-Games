import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  duration = input.required<number>();

  finished = output<void>();

  onAnimationEnd() {
    this.finished.emit();
  }
}
