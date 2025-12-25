import { Component, inject } from '@angular/core';
import { THEMES, ThemeService } from './core/services/theme.service';
import { ButtonComponent } from "./shared/components/button/button.component";
import { GameConfigComponent } from "./features/number-sum/pages/game-config/game-config.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ButtonComponent, GameConfigComponent],
})
export class AppComponent {
  themeService = inject(ThemeService);
  
  changeTheme() {
    this.themeService.changeTheme(THEMES.NUMBER_SUM);
  }
}
