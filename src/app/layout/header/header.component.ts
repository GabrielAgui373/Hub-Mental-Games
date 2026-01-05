import { Component, DOCUMENT, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter, fromEvent, map, startWith } from 'rxjs';
import { SoundService } from '../../core/services/sound/sound.service';
import { KeyboardService } from '../../core/services/keyboard/keyboard.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private document = inject(DOCUMENT);
  private soundService = inject(SoundService);
  private router = inject(Router);
  private location = inject(Location);
  protected keyboardService = inject(KeyboardService);

  isMuted = this.soundService.isMuted;
  isKeyboardEnabled = this.keyboardService.isKeyboardEnabled;

  isHome = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url === '/'),
      startWith(this.router.url === '/')
    ),
    { initialValue: this.router.url === '/' }
  );

  isFullscreen = toSignal(
    fromEvent(this.document, 'fullscreenchange').pipe(
      map(() => !!this.document.fullscreenElement),
      startWith(!!this.document.fullscreenElement) 
    ),
    { initialValue: false }
  );

  toggleFullScreen() {
    if (!this.document.fullscreenElement) {
      this.document.documentElement.requestFullscreen();
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      }
    }
  }

  toggleMute() {
    this.soundService.toggleMute();
  }

  toggleKeyboard() {
    this.keyboardService.toggle();
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goBack() {
    this.location.back();
  }
}