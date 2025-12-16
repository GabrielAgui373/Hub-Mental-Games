import { Component, computed, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  text = input.required();
  variant = input<ButtonVariant>('primary')
  size = input<ButtonSize>('md');
  disabled = input<boolean>(false);

  buttonClasses = computed(() => (
    {
      'button': true,
      [`button--${this.variant()}`] : true,
      [`button--${this.size()}`]: true,
    }
  ))
}
