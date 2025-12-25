import { Component, forwardRef, input, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputType = 'text' | 'number';
export type InputSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-input-text',
  imports: [],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent {
  label = input('');
  placeholder = input('');
  type = input<InputType>('text');
  size = input<InputSize>('md');

  value = signal<string>('');
  isDisabled = signal<boolean>(false);

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  private sanitizeValue(rawValue: any): string {
    if (rawValue === null || rawValue === undefined) {
      return '';
    }

    let valueStr = String(rawValue);

    if (this.type() !== 'number') {
      return valueStr;
    }

    let cleanValue = valueStr.replace(/[^0-9-]/g, '');


    const hasMinus = cleanValue.startsWith('-');
    cleanValue = cleanValue.replace(/-/g, '');
    if (hasMinus) {
      cleanValue = '-' + cleanValue;
    }

    return cleanValue;
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const rawValue = inputElement.value;

    const newValue = this.sanitizeValue(rawValue);

    if (inputElement.value !== newValue) {
      inputElement.value = newValue;
    }

    this.value.set(newValue);
    this.onChange(newValue);
  }

  writeValue(obj: any): void {
    const sanitized = this.sanitizeValue(obj);
    this.value.set(sanitized);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
