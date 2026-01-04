import { Component, DOCUMENT, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map, startWith } from 'rxjs';
import { SoundService } from '../../core/services/sound/sound.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private document = inject(DOCUMENT);
  private soundService = inject(SoundService);

  isMuted = this.soundService.isMuted;

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
}