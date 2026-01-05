import { Component, output } from '@angular/core';

@Component({
  selector: 'app-numeric-keyboard',
  imports: [],
  templateUrl: './numeric-keyboard.component.html',
  styleUrl: './numeric-keyboard.component.scss',
})
export class NumericKeyboardComponent {
 click = output<number>();

  onKeyClick(value: number): void {
    this.click.emit(value);
  }
}
