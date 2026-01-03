import { computed, Injectable, signal } from '@angular/core';

@Injectable()
export class GameService<C, R> {
  private _config = signal<C | null>(null);
  private _result = signal<R | null>(null);

  readonly config = this._config.asReadonly();
  readonly result = this._result.asReadonly();

  readonly hasConfig = computed(() => !!this._config());
  readonly hasResult = computed(() => !!this._result());

  setGameConfig(config: C) {
    this._config.set(config);
    this._result.set(null);
  }

  setGameResult(result: R) {
    this._result.set(result);
  }

  restartGame() {
    this._result.set(null);
  }

  resetAll() {
    this._config.set(null);
    this._result.set(null);
  }
}
