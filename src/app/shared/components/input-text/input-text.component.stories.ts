import { Meta, StoryObj } from '@storybook/angular';
import { InputTextComponent } from './input-text.component';

const meta: Meta<InputTextComponent> = {
  component: InputTextComponent,
  title: 'Components/Input Text',
};

export default meta;
type Story = StoryObj<InputTextComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Enter with number',
    label: 'Label',
  },
};


export const Small: Story = {
  args: {
    placeholder: 'Enter with number',
    label: 'Label',
    size: 'sm'
  },
};


export const Large: Story = {
  args: {
    placeholder: 'Enter with number',
    label: 'Label',
    size: 'lg'  
  },
};

export const ExtraLarge: Story = {
  args: {
    placeholder: 'Enter with number',
    label: 'Label',
    size: 'xl'  
  },
};


export const Numeric: Story = {
  args: {
    placeholder: 'Enter with number',
    label: 'Label',
    type: 'number',
  },
};

