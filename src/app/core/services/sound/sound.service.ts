import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  isMuted = signal(false);

  constructor() {
    this.load('correct', 'assets/sounds/correct.mp3');
    this.load('wrong', 'assets/sounds/wrong.mp3');
  }

  load(key: string, path: string): void {
    const audio = new Audio();
    audio.src = path;
    audio.load();
    this.sounds.set(key, audio);
  }

  play(key: string): void {
    if (this.isMuted()) return;

    const audio = this.sounds.get(key);
    if (audio) {

      audio.currentTime = 0;
      audio.play().catch(error => console.warn('Audio play blocked:', error));
    }
  }

  toggleMute() {
    this.isMuted.update(val => !val);
  }
}