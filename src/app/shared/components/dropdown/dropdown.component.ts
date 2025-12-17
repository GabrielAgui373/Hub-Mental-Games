import { Component, input, signal } from '@angular/core';

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
  placeholder = input('');
  emptyOptionsText = input("Nenhum item carregado");

  isPanelListVisible = signal(false);
  selectedOption = signal<DropdownOption<T> | null>(null);


  togglePanelListVisibility() {
    this.isPanelListVisible.update(value => !value);
    console.log(this.isPanelListVisible())
  }
}
