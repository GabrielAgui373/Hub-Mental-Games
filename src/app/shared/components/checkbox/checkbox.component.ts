import { booleanAttribute, Component, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
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
})
export class CheckboxComponent implements ControlValueAccessor{
  label = input('');
  labelPosition = input<'after' | 'before'>('after');
  indeterminate = input(false);

  checked = model(false);
  disabled = model(false);

  toggle() {
    this.checked.update((v) => !v);
  }

  writeValue(value: boolean): void {
    this.checked.set(value);
  }



  onKeyDown(event: KeyboardEvent) {
    if(this.disabled()) return;

    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  onBlur() {

  }
}
