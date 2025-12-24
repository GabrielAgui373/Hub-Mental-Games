import { Component, inject } from '@angular/core';
import { NumberSumComponent } from "./features/number-sum/number-sum.component";
import { THEMES, ThemeService } from './core/services/theme.service';
import { ButtonComponent } from "./shared/components/button/button.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ButtonComponent],
})
export class AppComponent {
  themeService = inject(ThemeService);
  
  changeTheme() {
    this.themeService.changeTheme(THEMES.NUMBER_SUM);
  }
}
