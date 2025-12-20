import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    text: 'Start',
  },
};

export const Outline: Story = {
  args: {
    text: 'Start',
    variant: 'outline'
  },
};


export const Small: Story = {
  args: {
    text: 'Start',
    size: 'sm'
  },
};

export const Large: Story = {
  args: {
    text: 'Start',
    size: 'lg'
  },
};

export const FullWidth: Story = {
  args: {
    text: 'Start',
    fullWidth: true,  
  }
}



export const Disabled: Story = {
  args: {
    text: 'Start',
    disabled: true,
  }
}




