import { Component, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  host: {
    'role': 'checkbox',
    '[attr.aria-checked]': 'indeterminate() ? "mixed" : checked()',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.tabindex]': 'disabled() ? "-1" : "0"',
    '(keydown)': 'onKeyDown($event)',
    '(blur)': 'onBlur()',
    '(click)': 'toggle()'
  }
})
export class CheckboxComponent implements ControlValueAccessor {
  label = input('');
  labelPosition = input<'after' | 'before'>('after');
  indeterminate = input(false);

  checked = model(false);
  disabled = model(false);

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  toggle() {
    if (!this.disabled()) {
      this.checked.update(v => !v);
      this.onChange(this.checked());
      this.onTouched();
    }
  }

  writeValue(value: boolean): void {
    this.checked.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.disabled()) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  onBlur() {
    this.onTouched();
  }
}