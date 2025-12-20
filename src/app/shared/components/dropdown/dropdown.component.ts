import {
  booleanAttribute,
  Component,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface DropdownOption<T> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent<T> implements ControlValueAccessor {
  label = input('');
  options = input<DropdownOption<T>[]>([]);
  placeholder = input('Selecione um item');
  emptyOptionsText = input('Nenhum item carregado');
  dataKey = input<string>();

  isOpen = signal(false);
  selectedOption = signal<DropdownOption<T> | null>(null);
  isDisabled = signal(false);

  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: T | null): void {
    if (value) {
      const selected = this.options().find((option) => this.areValuesEquals(value, option.value)) ?? null;
      this.selectedOption.set(selected);
    } else {
      this.selectedOption.set(null); 
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  private areValuesEquals(val1: any, val2: any): boolean {
    if (val1 === val2) return true;

    if (
      val1 === null ||
      val1 === undefined ||
      val2 === null ||
      val2 === undefined
    ) {
      return false;
    }

    if (this.dataKey() && val1[this.dataKey()!] === val2[this.dataKey()!]) {
      return true;
    }

    return false;
  }

  toggleDropdownOpen() {
    if(this.isDisabled()) return 

    //Avisar ao angular que o valor foi tocado
    this.onTouched();
    this.isOpen.update(v => !v);
  }

  selectOption(option: DropdownOption<T>) {
    this.selectedOption.set(option);
    this.isOpen.set(false);

    //Avisar ao Reactive Forms que o valor mudou
    this.onChange(option.value);
  }

  onBlur() {
    //Avisar ao angular que o valor foi tocado
    this.onTouched();

    setTimeout(() => {
      this.isOpen.set(false);
    }, 150);
  }
}
