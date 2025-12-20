import { Meta, StoryObj } from '@storybook/angular';
import { DropdownComponent } from './dropdown.component';

const meta: Meta<DropdownComponent<any>> = {
  component: DropdownComponent,
  title: 'Components/Dropdown',
};

export default meta;
type Story = StoryObj<DropdownComponent<any>>;

export const Default: Story = {
  args: {
    label: 'Intervalo',
    placeholder: 'Selecione o intervalo',
    options: [
      { label: '1 segundo', value: 1000 },
      { label: '2 segundos', value: 2000 },
      { label: '0.5 segundos', value: 500 },
      { label: '0.3 segundos', value: 300 },
      { label: '0.2 segundos', value: 200 },
    ],
  },
};
