import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';

export enum THEMES {
  HUB = 'hub',
  NUMBER_SUM = 'number-sum'
}

export type ThemeType = typeof THEMES[keyof typeof THEMES];

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);
  theme = signal<ThemeType>(THEMES.HUB);
  
  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      this.document.documentElement.setAttribute('data-theme', currentTheme);
    })
  }

  changeTheme(theme: ThemeType) {
    this.theme.set(theme);
  }
}
