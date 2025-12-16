import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-number-sum',
  imports: [],
  templateUrl: './number-sum.component.html',
  styleUrl: './number-sum.component.scss'
})
export class NumberSumComponent {
  number = signal(0);

  
}
