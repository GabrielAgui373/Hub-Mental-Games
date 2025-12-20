import { booleanAttribute, Component, computed, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  text = input.required();
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input(false, { transform: booleanAttribute });
  fullWidth = input(false, {transform: booleanAttribute});
  type = input<ButtonType>('button');

  buttonClasses = computed(() => ({
    button: true,
    [`button--${this.variant()}`]: true,
    [`button--${this.size()}`]: true,
  }));
}
