import { Component, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize, map, take, timer } from 'rxjs';

@Component({
  selector: 'app-countdown',
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent {
  startDue = input(500);
  finished = output<void>();

  counter$ = timer(this.startDue(), 1000).pipe(
    take(4),
    map((i) => 3 - i),
    finalize(() => {
      this.finished.emit();
    })
  );

  value = toSignal(this.counter$);
}
