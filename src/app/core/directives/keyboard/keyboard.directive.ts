import { Directive, ElementRef, inject, effect } from '@angular/core';
import { KeyboardService } from '../../services/keyboard/keyboard.service';

@Directive({
  selector: 'input, textarea',
  standalone: true
})
export class KeyboardControlDirective {
  private el = inject(ElementRef);
  private keyboardService = inject(KeyboardService);

  constructor() {
    effect(() => {
      const isCustomKeyboardActive = this.keyboardService.isKeyboardEnabled();
      if (isCustomKeyboardActive) {
        this.el.nativeElement.setAttribute('inputmode', 'none');
      } else {
        this.el.nativeElement.removeAttribute('inputmode');
      }
    });
  }
}