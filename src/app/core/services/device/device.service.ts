import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private platformId = inject(PLATFORM_ID);
  
  readonly isMobile = signal<boolean>(this.checkDevice());

  private checkDevice(): boolean {
    // Verifica se estar no navegador (evita erro no SSR/Node)
    if (isPlatformBrowser(this.platformId)) {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileUA = /android|iphone|kindle|ipad|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth <= 800;
      
      return isMobileUA || isSmallScreen;
    }
    return false;
  }
}