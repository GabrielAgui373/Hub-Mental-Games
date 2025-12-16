import { Component } from '@angular/core';
import { NumberSumComponent } from "./features/number-sum/number-sum.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [NumberSumComponent],
})
export class AppComponent {

}
