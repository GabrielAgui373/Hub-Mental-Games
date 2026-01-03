import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs';

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
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  theme = signal<ThemeType>(THEMES.HUB);
  
  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      console.log('Atualizando DOM para:', currentTheme);
      this.document.documentElement.setAttribute('data-theme', currentTheme);
    })

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        let current: ActivatedRoute | null = route;

        while(current) {
          if(current.snapshot.data['theme']) {
            return current.snapshot.data['theme'] as ThemeType;
          }
          current = current.firstChild
        }
        
        return THEMES.HUB;
      }),
     
      distinctUntilChanged(),
    ).subscribe((foundTheme) => {
      console.log('Mudança de tema detectada:', foundTheme);
      this.changeTheme(foundTheme);
    })
  }

  changeTheme(theme: ThemeType) {
    this.theme.set(theme);
  }
}
