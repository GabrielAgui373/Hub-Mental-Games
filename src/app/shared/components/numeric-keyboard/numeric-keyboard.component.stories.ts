import { Meta, StoryObj } from "@storybook/angular";
import { NumericKeyboardComponent } from "./numeric-keyboard.component";

const meta: Meta<NumericKeyboardComponent> = {
  title: "Components/NumericKeyboard",
  component: NumericKeyboardComponent,

};

export default meta;
type Story = StoryObj<NumericKeyboardComponent>;

export const Default: Story = {}