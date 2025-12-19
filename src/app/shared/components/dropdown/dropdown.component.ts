import { booleanAttribute, Component, input, signal } from '@angular/core';

export interface DropdownOption<T> {
  label: string,
  value: T,
}

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent<T> {
  label = input('')
  options = input<DropdownOption<T>[]>([]);
  placeholder = input('Selecione um item');
  emptyOptionsText = input("Nenhum item carregado");
  disabled = input(false, { transform: booleanAttribute });

  isOpen = signal(false);
  selectedOption = signal<DropdownOption<T> | null>(null);


  toggleDropdownOpen() {
    this.isOpen.update(value => !value);
    console.log(this.isOpen())
  }

  selectOption(option: DropdownOption<T>) {
    this.selectedOption.set(option);
    this.isOpen.set(false);
  }

  onBlur() {
    setTimeout(() => {
      this.isOpen.set(false);
    }, 150);
  }
}
