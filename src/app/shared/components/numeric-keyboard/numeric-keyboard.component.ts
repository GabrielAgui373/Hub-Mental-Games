import { Component, output } from '@angular/core';

@Component({
  selector: 'app-numeric-keyboard',
  standalone: true,
  templateUrl: './numeric-keyboard.component.html',
  styleUrl: './numeric-keyboard.component.scss',
})
export class NumericKeyboardComponent {
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  click = output<number | 'backspace' | 'enter'>();

  onKeyClick(value: number | 'backspace' | 'enter'): void {
    this.click.emit(value);
  }
}