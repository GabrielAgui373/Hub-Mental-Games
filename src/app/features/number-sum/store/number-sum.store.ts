import { computed, Injectable, signal } from '@angular/core';
import { NumberSumConfig, NumberSumResult } from './number-sum.types';

@Injectable({
  providedIn: 'root',
})
export class NumberSumStore {
  private _config = signal<NumberSumConfig | null>(null);
  private _result = signal<NumberSumResult | null>(null);

  readonly config = this._config.asReadonly();
  readonly result = this._result.asReadonly();

  readonly hasConfig = computed(() => !!this._config());
  readonly hasResult = computed(() => !!this._result());

  setGameConfig(config: NumberSumConfig) {
    this._config.set(config);
    this._result.set(null); 
  }

  setGameResult(result: NumberSumResult) {
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
