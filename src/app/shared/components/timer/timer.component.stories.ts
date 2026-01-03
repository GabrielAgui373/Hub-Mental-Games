import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TimerComponent } from './timer.component';

const meta: Meta<TimerComponent> = {
  title: 'Components/Timer',
  component: TimerComponent,
};

export default meta;
type Story = StoryObj<TimerComponent>;

export const Default: Story = {
    args: {
        duration: 60000,
    }
};
