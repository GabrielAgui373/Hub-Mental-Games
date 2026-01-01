import { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
};

export default meta;
export type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  args: {
    label: 'This is a label',
  },
};
