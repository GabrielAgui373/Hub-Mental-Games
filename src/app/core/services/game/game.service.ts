import { computed, Injectable, signal } from '@angular/core';

export interface PersistenceOptions<R> {
  gameId: string;
  isBetterFn: (current: R, best: R) => boolean;
}

@Injectable()
export class GameService<C, R> {
  private _config = signal<C | null>(null);
  private _result = signal<R | null>(null);
  private _bestResult = signal<R | null>(null);

  readonly config = this._config.asReadonly();
  readonly result = this._result.asReadonly();
  readonly bestResult = this._bestResult.asReadonly();

  readonly hasConfig = computed(() => !!this._config());
  readonly hasResult = computed(() => !!this._result());

  setGameConfig(config: C) {
    this._config.set(config);
    this._result.set(null);
  }

  setGameResult(result: R, persistence?: PersistenceOptions<R>) {
    this._result.set(result);
    if (persistence) {
      this.handlePersistence(result, persistence);
    }
  }

  isNewRecord(result: R): boolean {
    const best = this._bestResult();
    return result === best;
  }

  loadBestResult(gameId: string) {
    const saved = localStorage.getItem(this.getStorageKey(gameId));
    if (saved) {
      this._bestResult.set(JSON.parse(saved));
    } else {
      this._bestResult.set(null);
    }
  }

  private handlePersistence(result: R, options: PersistenceOptions<R>) {
    const key = this.getStorageKey(options.gameId);
    const saved = localStorage.getItem(key);
    const currentBest: R | null = saved ? JSON.parse(saved) : null;

    if (!currentBest || options.isBetterFn(result, currentBest)) {
      localStorage.setItem(key, JSON.stringify(result));
      this._bestResult.set(result); 
    } else {
      this._bestResult.set(currentBest); 
    }
  }

  private getStorageKey(gameId: string): string {
    return `gh_rec_${gameId}`;
  }

  restartGame() {
    this._result.set(null);
  }

  resetAll() {
    this._config.set(null);
    this._result.set(null);
    this._bestResult.set(null);
  }
}