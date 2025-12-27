import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map, startWith } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private document = inject(DOCUMENT);

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
}
