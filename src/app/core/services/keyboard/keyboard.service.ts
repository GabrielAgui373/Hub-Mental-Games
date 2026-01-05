import { Injectable, signal, inject } from '@angular/core';
import { DeviceService } from '../device/device.service';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  private deviceService = inject(DeviceService);
  
  readonly isKeyboardEnabled = signal<boolean>(this.deviceService.isMobile());

  enable() {
    this.isKeyboardEnabled.set(true);
  }

  disable() {
    this.isKeyboardEnabled.set(false);
  }

  toggle() {
    this.isKeyboardEnabled.update(v => !v);
  }
}