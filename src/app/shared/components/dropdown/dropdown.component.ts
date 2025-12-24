import {
  booleanAttribute,
  Component,
  ElementRef,
  forwardRef,
  input,
  signal,
  viewChild,
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
  highlightedIndex = signal(-1);

  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  listContainer = viewChild<ElementRef>('listContainer');

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

    if (!this.isOpen()) {
      this.isOpen.set(true);
   
      this.syncHighlightWithSelection();
    } else {
      this.isOpen.set(false);
      this.highlightedIndex.set(-1);
    }
  }

  selectOption(option: DropdownOption<T>) {
    this.selectedOption.set(option);
    this.isOpen.set(false);
    this.highlightedIndex.set(-1);

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

  onKeyDown(event: KeyboardEvent) {
    if (this.isDisabled()) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault(); 
        this.handleArrowDown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.handleArrowUp();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.handleEnter();
        break;
      case 'Escape':
      case 'Tab':
        this.isOpen.set(false);
        this.highlightedIndex.set(-1);
        break;
    }
  }

  private handleArrowDown() {
    if (!this.isOpen()) {
      this.toggleDropdownOpen();
      return;
    }
    
    const optionsLength = this.options().length;
    this.highlightedIndex.update((i) => i < optionsLength - 1 ? i + 1 : i);
    this.scrollToHighlighted();
  }

  private handleArrowUp() {
    if (!this.isOpen()) return;

    // Decrementa índice, travando no primeiro
    this.highlightedIndex.update((i) => i > 0 ? i - 1 : 0);
    this.scrollToHighlighted();
  }

  private handleEnter() {
    if (!this.isOpen()) {
      this.toggleDropdownOpen();
      return;
    }

    const index = this.highlightedIndex();
    if (index >= 0 && index < this.options().length) {
      this.selectOption(this.options()[index]);
    }
  }

  private syncHighlightWithSelection() {
    const selected = this.selectedOption();
    if (selected) {
      const index = this.options().findIndex(opt => this.areValuesEquals(opt.value, selected.value));
      this.highlightedIndex.set(index);
    
      setTimeout(() => this.scrollToHighlighted(), 0);
    } else {
      this.highlightedIndex.set(0); 
    }
  }

  private scrollToHighlighted() {
    if (!this.isOpen()) return;

    const index = this.highlightedIndex();
    const itemElement = document.getElementById(`dropdown-option-${index}`);
    
    if (itemElement) {
      itemElement.scrollIntoView({ block: 'nearest' });
    }
  }
}
