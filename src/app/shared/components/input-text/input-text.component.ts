import { Component, input } from '@angular/core';

export type InputType = "text" | "number";
export type InputSize = "sm" | "md" | "lg";

@Component({
  selector: 'app-input-text',
  imports: [],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent {
  label = input("");
  placeholder = input("");
  type = input<InputType>("text");
  size = input<InputSize>("md");
}
